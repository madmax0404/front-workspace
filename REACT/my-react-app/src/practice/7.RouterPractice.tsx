import { Link, Route, Routes } from "react-router-dom";
import UserInfoContainer from "./1.PropsPractice";
import BoardContainer from "../practice2/BoardContainer";
import ModuleCssPractice from "./3.ModuleCssPrac";
import AutoSaveEditor from "./4.UseEffectPractice";
import OptimizationPractice from "./5.OptimizationPractice";
import PokemonSearch from "./6.AxiosPractice";

export default function RouterPractice() {

    return (
        <>
            <div className='App'>
                <div className='header'>
                    <h1 style={{ fontWeight: "bolder" }}>KH G CLASS</h1>
                </div>
                <div>
                    {/* 라우트 설정  */}
                    <Routes>
                        <Route path="/" element={<div className='title'>Home</div>} />
                        <Route path="/practice">
                            <Route path="1" element={<UserInfoContainer />} />
                            <Route path="2" element={<BoardContainer />} />
                            <Route path="3" element={<ModuleCssPractice />} />
                            <Route path="4" element={<AutoSaveEditor />} />
                            <Route path="5" element={<OptimizationPractice />} />
                            <Route path="6">
                                <Route path='id/:id' element={<PokemonSearch />} />
                                <Route path='' element={<PokemonSearch />} />
                            </Route>
                        </Route>
                        <Route path='*' element={
                            <div>
                                <h1 style={{ color: 'red' }}>잘못된 페이지입니다.</h1>
                                {/* 
                                    Link
                                    - html의 a 태그와 동일한 기능을 수행하나, 페이지 이동시 새로고침 없이 컴포넌트를 전환한다.
                                    - a 태그로 인한 페이지 이동은 location을 조작하는 행위로, 리액트에서는 권장하지 않는 이동방식이다.
                                */}
                                <Link to={"/"}>메인페이지로 가기</Link>
                                <br />
                                {/* <a href="/">a 태그로 이동</a> */}
                            </div>
                        } />
                    </Routes>
                    <nav className='nav'>
                        <li>
                            {/* Link 컴포넌트를 사용하여 라우팅 설정 */}
                            <Link to="/">메인페이지</Link>
                        </li>
                        <li>
                            <Link to={"/practice/1"}>실습1</Link>
                        </li>
                        <li>
                            <Link to={"/practice/2"}>실습2</Link>
                        </li>
                        <li>
                            <Link to={"/practice/3"}>실습3</Link>
                        </li>
                        <li>
                            <Link to={"/practice/4"}>실습4</Link>
                        </li>
                        <li>
                            <Link to={"/practice/5"}>실습5</Link>
                        </li>
                        <li>
                            <Link to={"/practice/6"}>실습6</Link>
                        </li>
                    </nav>

                </div>
            </div>
        </>
    )
}