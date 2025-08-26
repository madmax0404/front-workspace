import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { loginSuccess } from "../../features/authSlice";

export default function OAuth2Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken") as string;

        // 인증 성공 후 사용자 정보 조회
        axios.get("http://localhost:8081/api/auth/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            dispatch(loginSuccess({accessToken, user:res.data}));
            navigate("/menus", {state: {flash: "로그인 완료."}, replace: true});
        })
    }, [])

    return (
        <div>
            <p>로그인 처리중...</p>
        </div>
    )
}