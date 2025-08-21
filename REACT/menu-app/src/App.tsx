import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import MenuList from './pages/1.MenuList'
import MenuInsert from './pages/3.MenuInsert'
import MenuDetail from './pages/2.MenuDetail'
import MenuEdit from './pages/4.MenuEdit'

function App() {

    return (
        <div id="container">
            <Header />
            <section id="content">
                <div id="menu-container" className="text-center">
                    <Routes>
                        <Route path="/" element={<h1>홈</h1>}/>
                        <Route path="/menus">
                            <Route path="" element={<MenuList/>} />
                            <Route path=":id" element={<MenuDetail/>} />
                            <Route path="new" element={<MenuInsert/>} />
                            <Route path=":id/edit" element={
                                <>
                                    <MenuDetail/>
                                    <MenuEdit/>
                                </>
                                } />
                        </Route>
                    </Routes>
                </div>
            </section>
        </div>
    )
}

export default App
