import axios from "axios";
import { useForm } from "./useForm";
import { useEffect, useState } from "react";

interface User {
    name: string,
    email: string
}

export default function AxiosPost() {
    const {form, handleChange, resetForm} = useForm<User>({
        name: "",
        email: ""
    });
    const [submittedUser, setSubmittedUser] = useState<User|null>(null);
    const [error, setError] = useState("");
    const handleSubmit = () => {
        if (!form.name || !form.email) {
            setError("이름과 이메일을 모두 입력하세요.");
            return;
        }
        
        axios.post("https://jsonplaceholder.typicode.com/users", form)
        .then(res => {
            setSubmittedUser(res.data);
            resetForm();
            setError("");
        })
        .catch(err => setError("등록 중 오류가 발생했습니다."));
    };

    // useEffect(() => {
    // }, []);


    return (
        <div className="form-container">
            <h2>사용자 등록</h2>
            <div className="form-group">
                <label>이름</label>
                <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>이메일</label>
                <input name="email" value={form.email} onChange={handleChange} />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button onClick={handleSubmit}>등록하기</button>
            {submittedUser && (
                <div className="result-box">
                    <h4>등록된 사용자 정보</h4>
                    <p>이름: {submittedUser.name}</p>
                    <p>이메일: {submittedUser.email}</p>
                </div>
            )}
        </div>
    );
}