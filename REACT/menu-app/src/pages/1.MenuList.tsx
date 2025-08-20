import { useEffect, useState } from "react";
import {type Menu} from "../types/menu";
import { loadMenus } from "../api/menuApi";
import RadioGroup from "../components/RadioGroup";
import useInput from "../hooks/useInput";

export default function MenuList() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [searchKeyword, onChangeKeyword] = useInput({
        type: "all",
        taste: "all"
    });

    // #1. 게시글 불러오기
    // - useEffect를 활용하여 컴포넌트가 마운트 될 때 1번만 로드되도록 설정.
    useEffect(() => {
        /**
         * #2. CORS(Cross-Origin Resource Sharing) 설정
         * - 브라우저는 보안상 SOP 정책을 사용한다.
         * - SOP 동일한 출처(Origin)에서만 리소스 요청을 허용하는 정책.
         * - 출처(Origin): 프로토콜+ip+포트번호.
         * - 이 때 요청을 받는 서버측에서 현재 출처에 대한 요청을 허용하도록 CrossOrigin 속성을 추가해줘야 한다.
         */
        loadMenus(searchKeyword).then(res => setMenus(res.data)).catch(err => {
            console.log(err);
            alert("검색 결과가 없습니다.");
        });
    }, []);

    const searchClick = () => {
        loadMenus(searchKeyword).then(res => setMenus(res.data)).catch(err => {
            console.log(err);
            alert("검색 결과가 없습니다.");
        });
    };

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
                                <tr key={menu.id}>
                                    <td>{menu.id}</td>
                                    <td>{menu.restaurant}</td>
                                    <td>{menu.name}</td>
                                    <td>{menu.price}</td>
                                    <td>{menu.type}</td>
                                    <td>{menu.taste}</td>
                                    <td><button type="button"></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}