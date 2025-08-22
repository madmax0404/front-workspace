import { useEffect, useState } from "react";
import {type Menu} from "../types/menu";
import { loadMenus, searchMenus } from "../api/menuApi";
import RadioGroup from "../components/RadioGroup";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function MenuList() {
    // const [menus, setMenus] = useState<Menu[]>([]);
    // const [newMenus, ]
    const [searchKeyword, onChangeKeyword] = useInput({
        type: "all",
        taste: "all"
    });

    const [submittedKeyword, setSubmittedKeyword] = useState({
        type: "all",
        taste: "all"
    });

    const navigate = useNavigate();

    const baseUrl = "http://localhost:8081/api";

    // #1. 게시글 불러오기
    // - useEffect를 활용하여 컴포넌트가 마운트 될 때 1번만 로드되도록 설정.
    // useEffect(() => {
    //     /**
    //      * #2. CORS(Cross-Origin Resource Sharing) 설정
    //      * - 브라우저는 보안상 SOP 정책을 사용한다.
    //      * - SOP 동일한 출처(Origin)에서만 리소스 요청을 허용하는 정책.
    //      * - 출처(Origin): 프로토콜+ip+포트번호.
    //      * - 이 때 요청을 받는 서버측에서 현재 출처에 대한 요청을 허용하도록 CrossOrigin 속성을 추가해줘야 한다.
    //      */
    //     loadMenus(searchKeyword).then(res => setMenus(res.data)).catch(err => {
    //         console.log(err);
    //         alert("검색 결과가 없습니다.");
    //     });
    // }, []);

    const {data:menus, isLoading, isError, error} = useQuery<Menu[]>({
        queryKey: ['menus', submittedKeyword],
        queryFn: () => searchMenus(submittedKeyword),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        enabled: true
    });

    const searchClick = () => {
        // loadMenus(searchKeyword).then(res => setMenus(res.data)).catch(err => {
        //     console.log(err);
        //     alert("검색 결과가 없습니다.");
        // });
        setSubmittedKeyword(searchKeyword);
    };

    const queryClient = useQueryClient();
    const deleteMenuMutation = useMutation({
        mutationFn: (id:number) => axios.delete(baseUrl + `/menus/${id}`),
        onSuccess: (res) => {
            // 등록 요청 성공시
            queryClient.invalidateQueries({queryKey:['menus', submittedKeyword]});

            // 리디렉션(서버에서 location을 지정해 주었으면 해당 경로로, 아니면 목록으로 이동)
            navigate("/menus", {state: {flash: "메뉴가 삭제되었습니다."}});
        },
        onError: err => {
            console.log(err);
            alert("삭제 실패.");
        }
    });

    const handleDelete = (id:number) => {
        const bool = confirm("정말 삭제하시겠습니까?");

        if (bool) {
            deleteMenuMutation.mutate(id);

            // axios.delete(baseUrl + "/menus/" + id).then(res => alert("삭제 성공.")).catch(err => {
            //     console.log(err);
            //     alert("삭제 실패.");
            // });
    
            // loadMenus({type:"all", taste:"all"}).then(res => setMenus(res.data)).catch(err => {
            //     console.log(err);
            //     alert("검색 결과가 없습니다.");
            // });
        }
    };

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div className="alert alert-danger">{error.message}</div>

    return (
        <>
            <div className="menu-test">
                <h4>전체 메뉴 조회(GET)</h4>
            </div>
            <div className="form-check form-check-inline">
                <RadioGroup id="get-no-type" value="all" name="type" checked={searchKeyword.type == "all"} onChange={onChangeKeyword} label="모두"/>
                <RadioGroup id="get-kr" value="kr" name="type" checked={searchKeyword.type == "kr"} onChange={onChangeKeyword} label="한식"/>
                <RadioGroup id="get-jp" value="jp" name="type" checked={searchKeyword.type == "jp"} onChange={onChangeKeyword} label="일식"/>
                <RadioGroup id="get-ch" value="ch" name="type" checked={searchKeyword.type == "ch"} onChange={onChangeKeyword} label="중식"/>
            </div>
            <div className="form-check form-check-inline">
                <RadioGroup id="get-no-taste" value="all" name="taste" checked={searchKeyword.taste == "all"} onChange={onChangeKeyword} label="모두"/>
                <RadioGroup id="get-mild" value="mild" name="taste" checked={searchKeyword.taste == "mild"} onChange={onChangeKeyword} label="순한맛"/>
                <RadioGroup id="get-hot" value="hot" name="taste" checked={searchKeyword.taste == "hot"} onChange={onChangeKeyword} label="매운맛"/>
            </div>
            <input type="button" className="btn btn-block btn-outline-success btn-send" value="검색" onClick={searchClick}/>
            <div className="result" id="menus-result">
                <table className="table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>음식점</th>
                            <th>메뉴</th>
                            <th>가격</th>
                            <th>타입</th>
                            <th>맛</th>
                            <th>버튼</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menus && menus.map((menu) => (
                                <tr key={menu.id} onClick={() => navigate(`/menus/${menu.id}`)} style={{cursor:'pointer'}}>
                                    <td>{menu.id}</td>
                                    <td>{menu.restaurant}</td>
                                    <td>{menu.name}</td>
                                    <td>{menu.price}</td>
                                    <td>{menu.type}</td>
                                    <td>{menu.taste}</td>
                                    <td>
                                        <button type="button" onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/menus/${menu.id}/edit`);
                                            }}>수정</button>
                                        <button type="button" onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(menu.id);
                                            }}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}