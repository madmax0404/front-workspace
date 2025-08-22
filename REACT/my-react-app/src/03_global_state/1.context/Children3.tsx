import { useContext } from "react"
import { MyContext } from "./Context"

export default function Children3() {
    const {userInfo, setUserInfo} = useContext(MyContext);
    
    return (
        <>
            <h1>Children3</h1>
            <button type="button" onClick={() => setUserInfo({name:"종윤", age:20})}>{userInfo.name} ::: {userInfo.age}</button>
        </>
    )
}