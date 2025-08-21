import { useNavigate } from "react-router-dom";
import RadioGroup from "../components/RadioGroup";
import useInput from "../hooks/useInput";
import { initMenu, type MenuCreate } from "../types/menu";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function MenuInsert() {
    // #1. 메뉴 등록 기능
    const [newMenus, handleInputChange] = useInput<MenuCreate>(initMenu);
    const navigate = useNavigate();

    /**
     * #2. useMutation
     * - 데이터 생성/수정/삭제시 사용하는 훅함수로 데이터 변경작업을 처리한다.
     * - useQuery처럼 자동 캐싱기능이 존재하지 않으며, 호출시점에서 1회 실행된다.
     * - 요청을 보낸 후 요청상태(loading, error, success)를 관리할 수 있으며, 요청 성공시 캐시데이터를 무효화(invalidate)시켜 관련 데이터를 refetch 한다.
     * 
     * [사용법]
     * const queryClient = useQueryClient(); 전역 캐시관리 객체. (쿼리 무효화에 사용한다.)
     * const mutation = useMutation({
     *      mutationFn: 비동기 함수,
     *      onSuccess: 성공시 실행되는 콜백함수,
     *      onError: 실패시 실행되는 콜백함수,
     *      onSettled: 항상 실행되는 콜백함수
     * });
     * 
     * [반환값]
     * - mutate: 요청을 실행하는 함수.
     * - isPending: 실행중 상태 값.
     * - isError: 에러 여부.
     * - isSuccess: 성공 여부.
     * - error: 에러 객체.
     * - data: 성공시 반환된 데이터.
     */
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newMenu:MenuCreate) => axios.post("http://localhost:8081/api/menus", newMenu),
        onSuccess: (res) => {
            // 등록 요청 성공시
            queryClient.invalidateQueries({queryKey:['menus']}); // 메뉴 목록 데이터 캐시 무효화.

            // 리디렉션(서버에서 location을 지정해 주었으면 해당 경로로, 아니면 목록으로 이동)
            const loc = res.headers['location'];
            console.log(loc);
            navigate(loc ?? "/menus", {
                state: {flash:"메뉴가 등록되었습니다."}
            });
        }
    });

    const insertMenu = (e: FormEvent) => {
        e.preventDefault(); // 제출 방지

        // 유효성 검사
        if (newMenus.restaurant == "" || newMenus.name == "") {
            alert("모든 필드를 입력하세요.");
            return;
        }

        if (newMenus.price < 0) {
            alert("가격은 0원 이상이어야 합니다.");
            return;
        }

        mutation.mutate(newMenus); // 비동기함수 실행
    };

    if (mutation.isPending) return <div>Loading...</div>
    if (mutation.isError) return <div className="alert alert-danger">{mutation.error.message}</div>

    return (
        <>
            <div className="menu-test">
                <h4>메뉴 등록하기(POST)</h4>
                <form id="menuEnrollFrm" onSubmit={insertMenu} >
                    <input type="text" name="restaurant" placeholder="음식점" className="form-control" onChange={handleInputChange} />
                    <input type="text" name="name" placeholder="메뉴" className="form-control" onChange={handleInputChange} />
                    <input type="number" name="price" placeholder="가격" className="form-control" onChange={handleInputChange} />
                    <div className="form-check form-check-inline">
                        <RadioGroup id="get-kr" value="kr" name="type" checked={newMenus.type == 'kr'} onChange={handleInputChange} label="한식" />
                        <RadioGroup id="get-ch" value="ch" name="type" checked={newMenus.type == 'ch'} onChange={handleInputChange} label="중식" />
                        <RadioGroup id="get-jp" value="jp" name="type" checked={newMenus.type == 'jp'} onChange={handleInputChange} label="일식" />
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioGroup id="get-hot" value="hot" name="taste" checked={newMenus.taste == 'hot'} onChange={handleInputChange} label="매운맛" />
                        <RadioGroup id="get-mild" value="mild" name="taste" checked={newMenus.taste == 'mild'} onChange={handleInputChange} label="순한맛" />
                    </div>
                    <br />
                    <input type="submit" className="btn btn-block btn-outline-success btn-send" value="등록" disabled={mutation.isPending} />
                    {/* disabled={createMenu.isPending} */}
                </form>
            </div>
        </>
    )
}