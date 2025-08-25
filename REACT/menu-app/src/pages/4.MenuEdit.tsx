import { useNavigate, useParams } from "react-router-dom";
import RadioGroup from "../components/RadioGroup";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initMenu, type Menu, type MenuUpdate } from "../types/menu";
import { getMenu, updateMenu as updateMenuApi } from "../api/menuApi";

const MenuEdit = () => {
    // #1. 메뉴 수정 기능 구현   
    // 요구사항
    // 1. 현재 메뉴 정보에 맞는 데이터를 서버에서 읽어온 후 , 폼에 바인딩한다.(useEffect+useQuery 사용)
    // 2. 읽어온 데이터가 없는 경우 목록 페이지로 이동시키고 "존재하지 않는 메뉴입니다." 메세지를 출력한다. 
    // 3. useInput훅을 사용하여 폼상태를 관리한다.
    // 4. 수정 버튼 클릭시 다음 내용에 대한 유효성 검사를 진행한다.
    //    - 모든 필드는 반드시 입력되어야 한다. 
    //    - price는 0이상 이어야 한다.
    //    - 유효성 검사 실패시 경고창(allert)을 통해 경고 메세지를 출력한다.
    // 5. 유효성 검사 통과시 서버에 수정요청을 보낸다(useMutation 사용)
    // 6. 수정 완료 후 상세 페이지로 이동시키고, 수정완료 메세지를 출력한다.
    // 7. 중복 제출을 방지하기 위해 제출이 진행되는 동안은 버튼을 비활성화 시킨다.
    // 8. 제출이 진행되는 동안은 로딩 상태를 표시한다.
    //    - <div>Loading...</div>
    // 9. 수정 실패시 에러 메세지를 출력한다.
    //    - <div className="alert alert-danger">에러메세지</div>
    const {id} = useParams();
    const navigate = useNavigate();

    const {data, isLoading, isError, error} = useQuery<Menu>({
        queryKey: ['menu', id], // 캐시 구분용 키
        queryFn: () => getMenu(Number(id)),
        staleTime: 1000 * 60, // fresh 유지 시간
        gcTime: 1000 * 60 * 5, // 캐시 메모리 저장 시간.
        enabled: true // 초기 실행 여부
    });

    const [newMenu, handleInputChange, resetMenu, setNewMenu] = useInput<MenuUpdate>(initMenu);

    useEffect(() => {
        if (data) {
            setNewMenu(data);
        }
    }, [data]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newMenu:MenuUpdate) => updateMenuApi(Number(id), newMenu),
        onSuccess: (res) => {
            // 등록 요청 성공시
            queryClient.invalidateQueries({queryKey:['menu', id]}); // 메뉴 목록 데이터 캐시 무효화.
            queryClient.invalidateQueries({queryKey:['menus']});

            // 리디렉션(서버에서 location을 지정해 주었으면 해당 경로로, 아니면 목록으로 이동)
            const loc = res.headers['location'];
            console.log(loc);
            navigate(loc ?? "/menus/" + id, {
                state: {flash: "메뉴가 수정되었습니다."}
            });
        },
        onError: err => {
            console.log(err);
            alert("수정 실패.");
        }
    });

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();

        let bool = confirm("정말 수정하시겠습니까?");
        if (bool) {
            if (newMenu.name == "" || newMenu.restaurant == "") {
                alert("식당명, 메뉴명을 입력해야 합니다.");
                return;
            }

            if (newMenu.price && newMenu.price < 0) {
                alert("가격은 0원 이상이어야 합니다.");
                return;
            }
            
            mutation.mutate(newMenu);
        }        
    };

    if (isLoading) return <div>Loading 중...</div>
    if (isError) {
        navigate("/menus", {state:{flash:"존재하지 않는 메뉴입니다."}});
        return;
    }

    if (mutation.isPending) {
        return <div>Loading 중...</div>
    }

    if (mutation.isError) {
        navigate("/menus", {state:{flash:"존재하지 않는 메뉴입니다."}});
        return;
    }

    return (
        <>
            <div className="menu-test">
                <h4>메뉴 수정하기(PUT)</h4>
                <form id="menuEnrollFrm" onSubmit={handleSubmit}>
                    <input type="text" name="restaurant" placeholder="음식점" className="form-control" value={newMenu.restaurant} onChange={handleInputChange} />
                    <input type="text" name="name" placeholder="메뉴" className="form-control" value={newMenu.name} onChange={handleInputChange} />
                    <input type="number" name="price" placeholder="가격" className="form-control" value={newMenu.price} onChange={handleInputChange} />
                    <div className="form-check form-check-inline">
                        <RadioGroup id="get-kr" value="kr" name="type" checked={newMenu.type == "kr"} onChange={handleInputChange} label="한식" />
                        <RadioGroup id="get-ch" value="ch" name="type" checked={newMenu.type == "ch"} onChange={handleInputChange} label="중식" />
                        <RadioGroup id="get-jp" value="jp" name="type" checked={newMenu.type == "jp"} onChange={handleInputChange} label="일식" />
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioGroup id="get-hot" value="hot" name="taste" checked={newMenu.taste == "hot"} onChange={handleInputChange} label="매운맛" />
                        <RadioGroup id="get-mild" value="mild" name="taste" checked={newMenu.taste == "mild"} onChange={handleInputChange} label="순한맛" />
                    </div>
                    <br />
                    <input type="submit" className="btn btn-block btn-outline-success btn-send" value="수정" disabled={mutation.isPending} />
                </form>
            </div>
        </>
    )
};

export default MenuEdit;