import React, { useState } from "react";

import './default.css'


type userType = {name: string, age: number, gender: string, phone: string};
type propsType = {
    item:userType
}

type inputWrapStrPropsType = {
    text:string,
    data:string|number,
    setStrData: (arg:string) => void;
}

type inputWrapNumPropsType = {
    text:string,
    data:string|number,
    setNumData: (arg:number) => void;
}

function TestApp() {
    const [userList, setUserList] = useState([
        { name: "유저1", age: 24, gender: "남자", phone: "010-2732-2241" },
        { name: "유저2", age: 27, gender: "여자", phone: "010-2674-0093" },
        { name: "유저3", age: 30, gender: "남자", phone: "010-3784-2834" },
    ]);

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const registUser = () => {
        const user = { name, age, gender, phone };
        userList.push(user);
        setUserList([...userList]);
        setName("");
        setAge(0);
        setGender("");
        setPhone("");
    };

    return (
        <div className="App">
            <h1>회원 정보 출력</h1>
            <hr></hr>
            <table className="member_tbl">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>나이</th>
                        <th>성별</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((item, index) => (
                            <User key={"user" + index} item={item} />
                        ))
                    }
                </tbody>
            </table>

            <div className="regist-wrap">
                <h3>회원 정보 등록</h3>
                <hr></hr>
                <InputWrapStr text="이름" data={name} setStrData={setName} />
                <InputWrapNum text="나이" data={age} setNumData={setAge} />
                <InputWrapStr text="성별" data={gender} setStrData={setGender} />
                <InputWrapStr text="전화번호" data={phone} setStrData={setPhone} />
                <button onClick={registUser}>회원등록</button>
            </div>
        </div>
    );
}

const User = ({item}:propsType) => {
    const user = item;

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
        </tr>
    );
};

const InputWrapStr = (props:inputWrapStrPropsType) => {
    const text = props.text;
    const data = props.data;
    const setData = props.setStrData;
    const changeInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.value);
    };

    return (
        <div className="input_wrap">
            <label>{text}</label>
            <input type="text" value={data} onChange={changeInputValue} />
        </div>
    );
};

const InputWrapNum = (props:inputWrapNumPropsType) => {
    const text = props.text;
    const data = props.data;
    const setData = props.setNumData;
    const changeInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData(Number(e.target.value));
    };

    return (
        <div className="input_wrap">
            <label>{text}</label>
            <input type="text" value={data} onChange={changeInputValue} />
        </div>
    );
};



export default TestApp;