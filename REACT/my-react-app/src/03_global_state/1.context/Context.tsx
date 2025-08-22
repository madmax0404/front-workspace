import { createContext, useState } from "react";
import Children1 from "./Children1";
import Children3 from "./Children3";

/**
 * #1. 전역 상태 관리
 * - 모든 컴포넌트에서 공용으로 사용하는 정보는 전역 상태로 관리하는 것이 좋다.
 *   * 공용상태: 사용자 정보, 전역 UI, 테마, 장바구니, 실시간 알람 등
 * - 만일 이런 데이터를 일반 state로 관리한다면, Appi.tsx에 상태를 선언 후, props 문법으로 전달해야 하는데(props drilling) 이 경우 유지보수 및 코드 관리가 어려워진다.
 * 
 * #2. Context
 * - 리액트에서 전역 상태 관리를 위해 제공하는 기능.
 * - 데이터 공급자(provider)와 데이터를 구독하는 구독자를 정의하여 데이터를 전달.
 * - 단, Context는 데이터 공유 기능만을 제공하며, 복잡한 상태관리가 필요하거나, 추가 기능이 필요한 경우 기타 상태관리 패키지를 사용한다.
 */

type User = {
    name: string,
    age: number
}

const initUser:User = {
    name: "hjy",
    age: 37
}

export const MyContext = createContext<{
    userInfo:User,
    setUserInfo: (value:User) => void
}>({
    userInfo: initUser,
    setUserInfo: () => {}
});

export default function ContextApi() {
    const [userInfo, setUserInfo] = useState(initUser);
    const contextValue = {
        userInfo, setUserInfo
    };

    return (
        <MyContext.Provider value={contextValue}>
            <hr />
            <Children1/>
            <hr />
            <Children3/>
        </MyContext.Provider>
    );
}