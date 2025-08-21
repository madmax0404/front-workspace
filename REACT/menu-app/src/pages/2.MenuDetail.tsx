import { useEffect, useRef, useState } from "react";
import { initMenu, type Menu } from "../types/menu"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function MenuDetail() {
    // const [menu, setMenu] = useState(initMenu);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState<string | null>(null);
    // const location = useLocation();
    // const id = location.pathname.split("/")[2];
    const { id } = useParams();
    const baseUrl = "http://localhost:8081/api/menus";

    // useEffect(() => {
    //     setIsLoading(true);
    //     axios.get(baseUrl + "/" + id).then(res => setMenu(res.data)).catch(err => setIsError(err)).finally(() => setIsLoading(false));
    // }, []);

    /*
        #1. 실습문제 상세화면 구현 구현
         - rest api 개발문서를 확인하여 서버의 URI와 HTTP메서드, 필요 파라미터를 확인하여 요청보내기
         - api요청결과를 기다리는 동안은 isLoading상태를 true로 설정하고, 로딩 완료시 false로 변경
         - api 응답결과 error발생시 isError상태를 true로 설정
    */
    /**
     * #2. React Query
        - 서버상태를 효율적으로 관리하기 위한 라이브러리로 주로 axios와 함께 사용된다.
        - API 요청 결과를 캐싱해두어, 요청시간을 줄일 수 있다.
        - 자동 로딩 및 에러 상태를 지원하여 loading 상태나 error를 useState로 관리하지 않아도 된다.
        - 최신 API 데이터 응답을 위해 일정 주기 간격으로 자동 refetch 기능도 제공한다.

        #3. React Query 동작 방식
        - React Query는 데이터를 "요청 -> 로딩 -> 성공/실패처리 -> 캐싱" 과정을 통해 서버상태를 관리한다.
        1) Fetch(데이터 요청 단계)
        - useQuery 훅으로 서버 데이터를 조회.
        - 데이터 조회 중에는 내부 loading 상태가 true가 된다.
        - 요청 성공시 서버의 응답이 data에 저장되고, 실패시 error 객체가 생성된다.
        2) Fresh(신선한 상태)
        - 요청 성공 후 응답받은 데이터는 캐시메모리에 저장된다.
        - 캐시된 데이터는 staleTime 동안 Fresh 상태로 간주된다.
        - 캐시메모리가 존재하는 동안은 동일 요청에 대해 캐시메모리에 저장된 상태값을 반환한다.
        3) Stale(오래된 상태)
        - staleTime이 지나면 데이터는 오래된(stale) 상태로 변경.
        - 상태값이 stale이 되면, React Query는 백그라운드에서 자동으로 데이터를 refetch 한다.
          * refetch의 트리거가 되는 상태들:
            - 컴포넌트 리마운트
            - 브라우저 포커스 복귀
            - 네트워크 재연결 등의 이벤트
        4) Inactive
        - 쿼리를 사용하던 컴포넌트가 언마운트되면, 해당 쿼리는 inactive 상태가 된다.
        - 하지만 데이터는 즉시 캐시메모리에서 삭제되는 것이 아니라, cacheTime동안 캐시에 남아 있다.
        - 따라서 컴포넌트가 다시 마운트 될 때 캐시메모리가 존재하면 해당 데이터를 즉시 보여준다.
        5) Deleted
        - 캐시타임이 지나면 캐시데이터는 완전히 삭제된다.

        npm install @tanstack/react-query
     */
    /**
     * #5. useQuery
     * - 데이터 조회(GET)시 사용하는 훅함수.
     * - 내부적으로 서버데이터를 캐시해두고, 컴포넌트가 리마운트 될 때마다 캐시상태를 확인.
     * - 캐시에 데이터가 있으면 즉시 반환하고, 동시에 백그라운드에서 최신 데이터를 refetch 한다.
     * - useQuery의 기본 staleTime은 0초로, 즉시 최신 데이터를 요청하고 캐시에 저장한다.
     */
    const {data:menu, isLoading, isError, error} = useQuery<Menu>({
        queryKey: ['menu', id], // 캐시 구분용 키
        queryFn: () => axios.get(baseUrl + "/" + id).then(res => res.data),
        staleTime: 1000 * 60, // fresh 유지 시간
        gcTime: 1000 * 60 * 5, // 캐시 메모리 저장 시간.
        enabled: true // 초기 실행 여부
    });

    if (isLoading) return <div>Loading 중...</div>
    if (isError) return <div>{error.message}</div>

    return (
        <>
            <div className="menu-test">
                <h4>메뉴 상세보기(GET)</h4>
                <div className="result" id="menus-result">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>음식점</th>
                                <th>메뉴</th>
                                <th>가격</th>
                                <th>타입</th>
                                <th>맛</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu && (
                                <tr>
                                    <td>{menu.id}</td>
                                    <td>{menu.restaurant}</td>
                                    <td>{menu.name}</td>
                                    <td>{menu.price}</td>
                                    <td>{menu.type}</td>
                                    <td>{menu.taste}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}