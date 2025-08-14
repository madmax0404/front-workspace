import './App.css'
import UserInfoContainer from './practice/1.PropsPractice';
import BoardContainer from './practice/2.BoardContainer';

function Practice() {
    return (
        <>
            <div className="App">
                <div className='header'>
                    <h1 style={{ fontWeight: "bolder" }}>KH G CLASS</h1>
                    {/* <UserInfoContainer/> */}
                    <BoardContainer/>
                </div>
            </div>
        </>
    )
}

export default Practice;