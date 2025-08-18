import './App.css'
import UserInfoContainer from './practice/1.PropsPractice';
import BoardContainer from './practice/2.BoardContainer';
import BoardContainer2 from './practice2/BoardContainer';
import ModuleCssPractice from './practice/3.ModuleCssPrac';
import AutoSaveEditor from './practice/4.UseEffectPractice';
import OptimizationPractice from './practice/5.OptimizationPractice';
import PokemonSearch from './practice/6.AxiosPractice';

function Practice() {
    return (
        <>
            <div className="App">
                <div className='header'>
                    <h1 style={{ fontWeight: "bolder" }}>KH G CLASS</h1>
                    {/* <UserInfoContainer/> */}
                    {/* <BoardContainer/> */}
                    {/* <ModuleCssPractice/> */}
                    {/* <BoardContainer2/> */}
                    {/* <AutoSaveEditor/> */}
                    <OptimizationPractice/>
                    {/* <PokemonSearch/> */}
                </div>
            </div>
        </>
    )
}

export default Practice;