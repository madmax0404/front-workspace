import { useContext } from "react"
import { MyContext } from "./Context"

export default function Children2() {
    /**
     * useContext(Context)
     * - 구독 컴포넌트에서 전역상태값을 사용하기위해 필요한 함수.
     * - 여러개의 전역상태들 중 하나를 골라서 매개변수에 전달.
     */
    const {userInfo} = useContext(MyContext);
    
    return (
        <>
            <h1>Children2</h1>
            <h3>{userInfo.name} ::: {userInfo.age}</h3>
        </>
    )
}