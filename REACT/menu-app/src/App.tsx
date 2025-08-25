import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import MenuList from './pages/1.MenuList'
import MenuInsert from './pages/3.MenuInsert'
import MenuDetail from './pages/2.MenuDetail'
import MenuEdit from './pages/4.MenuEdit'
import Login from './pages/login/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

    return (
        <div id="container">
            <Header />
            <section id="content">
                <div id="menu-container" className="text-center">
                    <Routes>
                        {/* 
                            라우트 설정
                            1. 로그인을 한 유저만 보이는 컴포넌트 설정.
                            2. 권한이 존재하는 경우만 보이는 컴포넌트 설정.
                        */}
                        <Route path="/" element={<h1>홈</h1>}/>
                        <Route path="/menus">
                            <Route path="" element={<MenuList/>} />
                            <Route path=":id" element={<MenuDetail/>} />
                            <Route path="new" element={
                                <ProtectedRoute>
                                    <MenuInsert/>
                                </ProtectedRoute>
                                } />
                            <Route path=":id/edit" element={
                                <>
                                    <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                                        <MenuDetail/>
                                        <MenuEdit/>
                                    </ProtectedRoute>
                                </>
                                } />
                        </Route>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/unauthorized" element={<div>권한이 없습니다.</div>} />
                    </Routes>
                </div>
            </section>
        </div>
    )
}

export default App
