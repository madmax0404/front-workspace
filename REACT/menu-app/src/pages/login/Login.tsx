import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authSlice";
import { api } from "../../api/menuApi";

export default function Login() {
    const navigate = useNavigate();
    // 입력 상태
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 요청 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const path = "http://localhost:8081/api/auth";

    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("이메일과 비밀번호를 모두 입력하세요.");
            return;
        }

        setLoading(true);
        setError("");

        api.post(path + "/login", {email, password})
        .then(res => {
            console.log(res);
            /**
             * #1. JWT 저장위치
             * - JWT 토큰은 클라이언트의 브라우저에서 관리해야하는 데이터이며, API 요청에 사용되는 **중요한** 데이터.
             * - AccessToken은 메모리에만 보관하고, RefreshToken은 쿠키(http-only)에 보관.
             * 
             * 1) localStorage
             * - 브라우저의 로컬 저장소, 브라우저가 종료되어도 데이터가 유지된다. (왜냐하면 하드드라이브에 다운로드 받기 때문.)
             * - 손쉬운 기능 구현시에는 잠깐 사용하지만, XSS 공격에 취약하다.
             * - 따라서, JWT와 같은 토큰을 관리하기 적합하지 않다. (털려도 상관없는 정보는 넣어도 됨.)
             * 
             * 2) sessionStorage
             * - 탭 단위 세션 저장소로, 탭을 닫으면 데이터도 삭제된다.
             * - localStorage 처럼 XSS 공격에 매우 취약하다.
             * 
             * 3) 쿠키
             * - 쿠키는 특정 도메인의 경로에 지정된 시간동안 저장되는 데이터.
             * - 쿠키는 HTTP 통신시 항상 자동으로 전달된다.
             * - 기본 쿠키는 js로 접근하여 탈취될 수 있으나, http-only로 설정된 쿠키는 js로 제어가 불가능하다. (XSS에서 안전하다.)
             * - CSRF 공격에 취약하기 때문에 CSRF 방어용 코드가 필요.
             * 
             * 4) 리액트의 메모리에 보관하기(리덕스)
             * - 리덕스의 스토어에 보관시 메모리에만 저장되며, 새로고침시 데이터가 소멸한다.
             * - XSS 공격의 위험이 존재하긴 하나 유지시간이 굉장히 짧기 떄문에 공격자체를 최소화 할 수 있다.
             * - 단, 새로고침시 데이터가 소실되기 때문에, 인증 유지를 위한 토큰재발급 기능이 필요하다.
             * 
             * #2. AccessToken을 Cookie에서 관리하지 않는 이유
             *    1. API 유연성 문제
             *    2. CORS 설정 문제
             *    3. 토큰 만료 처리
             */
            dispatch(loginSuccess(res.data));
            navigate("/", {state: {flash: "로그인 성공"}});
        }).catch((err:AxiosError) => {
            console.log(err);
            if (err.response?.status === 404) {
                const doSignUp = confirm("등록된 계정이 없습니다. 현재 입력한 이메일과 비밀번호로 회원가입 하시겠습니까?");

                if (!doSignUp) {
                    setError("계정을 다시 확인해주세요.");
                    setLoading(false);
                    return;
                }

                api.post(path + "/signup", {email, password})
                .then(res => {
                    console.log(res);
                    dispatch(loginSuccess(res.data));
                    navigate("/", {state: {flash: "로그인 성공"}});
                }).catch(err => {
                    console.log(err);
                    setError("회원가입에 실패했습니다. 나중에 다시 실행해 주세요.");
                }).finally(() => {
                    setLoading(false);
                })
            } else if (err.response?.status === 401) {
                setError("비밀번호가 잘못되었습니다.");
            } else {
                setError("로그인 처리 중 오류가 발생했습니다.");
            }
        }).finally(() => {
            setLoading(false);
        });
    };
    // 소셜 로그인은 백엔드 OAuth 엔드포인트로 리다이렉트
    const handleKakaoLogin = () => {
        // 카카오 인증서버 경로
        location.href = "http://localhost:8081/api/oauth2/authorization/kakao";
    };
    const handleNaverLogin = () => {
    };

    return (
        <div className={styles.page}>
            <section className={styles.card}>
                <h2 className={styles.title}>로그인</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <label htmlFor="email" className={styles.label}>
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        autoComplete="email"
                    />
                    <label htmlFor="password" className={styles.label}>
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                        autoComplete="current-password"
                    />
                    <button type="submit" className={styles.primaryBtn} disabled={loading}>
                        {loading ? "로그인 중…" : "로그인"}
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
                <div className={styles.dividerWrap}>
                    <div className={styles.divider} />
                    <span className={styles.dividerText}>또는</span>
                    <div className={styles.divider} />
                </div>
                <div className={styles.socialGroup}>
                    <button className={`${styles.socialBtn} ${styles.kakao}`} onClick={handleKakaoLogin}>
                        카카오로 로그인
                    </button>
                    <button className={`${styles.socialBtn} ${styles.naver}`} onClick={handleNaverLogin}>
                        네이버로 로그인
                    </button>
                </div>
            </section>
        </div>
    )
}