import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import MenuList from './pages/1.MenuList'
import MenuInsert from './pages/2.MenuInsert'

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
                            <Route path="new" element={<MenuInsert/>} />
                        </Route>
                    </Routes>
                </div>
            </section>
        </div>
    )
}

export default App
