import React, { useState } from 'react';


interface UserInfoProps {
    userInfo: {
        name: string,
        age: number,
        hobby: string[]
    };
    setUserInfo: ({name, age, hobby}:{name:string, age:number, hobby:string[]}) => void;
}

export default function UserInfoContainer() {
    let [userInfo, setUserInfo] = useState({name : '홍길동', age : 30, hobby : ['코딩','게임']});

    return (
        <div>
            <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
    );
}


function UserInfo({userInfo, setUserInfo}: UserInfoProps) {
    const handleChangeName = () => {
        setUserInfo({name:"hjy", age:37, hobby:["코딩", "책읽기"]});
    }
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
            <h2>사용자 정보</h2>
            <h3>이름: {userInfo.name}</h3>
            <h3>나이: {userInfo.age}</h3>
            <h3>취미: {userInfo.hobby.join(", ")}</h3>
            <button onClick={handleChangeName}>정보 변경</button>
        </div>
    );
}