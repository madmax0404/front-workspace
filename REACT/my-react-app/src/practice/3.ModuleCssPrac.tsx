import userListStyle from '../css/UserList.module.css';
import boardListStyle from '../css/BoardList.module.css';
import commonStyle from '../css/Common.module.css';

const users = [
    { id: 1, name: '홍길동', age: 28 },
    { id: 2, name: '김영희', age: 34 },
    { id: 3, name: '박철수', age: 23 },
];

const posts = [
    { id: 1, title: '공지사항입니다.', writer: '관리자' },
    { id: 2, title: '새로운 기능 소개', writer: '홍길동' },
    { id: 3, title: '업데이트 예정 안내', writer: '김영희' },
];

function UserList() {
    return (
        <div>
            <h2 className={userListStyle["title-user"]}>👤 사용자 목록</h2>
            <ul className={userListStyle["user-list"]}>
                {users.map(user => (
                    <li key={user.id} className="list-item hoverable">
                        이름: {user.name} / 나이: <span className="age">{user.age}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function BoardList() {
    return (
        <div>
            <h2 className="title-board">📋 게시판 목록</h2>
            <ul className="list">
                {posts.map(post => (
                    <li key={post.id} className="list-item hoverable">
                        제목: <span className="highlight">{post.title}</span> / 작성자:{" "}
                        <span className="writer">{post.writer}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function ModuleCssPractice() {
    return (
        <div>
            <UserList />
            <BoardList />
        </div>
    );
}
