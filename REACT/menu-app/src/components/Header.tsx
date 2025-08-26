import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { logout } from "../features/authSlice";
import { api } from "../api/menuApi";
import { useQueryClient } from "@tanstack/react-query";

/**
 * #components
 * - 어플리케이션 전역에서 공용으로 사용되는 컴포넌트를 보관하는 폴더.
 * ex) Header, Button, Input 기타 등등.
 */
export default function Header() {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        api.post("/auth/logout")
        .then(() => {
            dispatch(logout());
            navigate("/");
        }).catch(err => {
            console.log(err);
        });
        queryClient.removeQueries();
    };

    return (
        <header>
            <div id="header-container">
                <h1 style={{ textAlign: "center" }}>Menu App</h1>
                <div className="navbar bg-light navbar-expand">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/menus" className="nav-link">메뉴 전체 조회</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/menus/new" className="nav-link">메뉴 추가</Link>
                        </li>
                        {
                            auth.isAuthenticated ? (
                                <>
                                    <li>
                                        <span style={{ fontWeight: "bold" }}>
                                            {auth.user?.name} {auth.user?.email}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                padding: "8px 16px",
                                                backgroundColor: "#DC3545",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            로그아웃
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">로그인</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}