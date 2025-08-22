import { useRef } from "react";
import styles from './TodoList.module.css';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { editFinished, insertTodo, removeTodo } from "../features/todoSlice";

function TodoList() {
    const inputRef = useRef<HTMLInputElement>(null);
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();

    const handleInsert = () => {
        const inputValue = inputRef.current?.value.trim();

        if (!inputValue) {
            alert("값을 입력해주세요.");
            return;
        }

        dispatch(insertTodo({
            id: Math.max(...todos.map(todo => todo.id), 0) + 1,
            text: inputValue,
            completed: false
        }));

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleInsertEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            const inputValue = inputRef.current?.value.trim();

            if (!inputValue) {
                alert("값을 입력해주세요.");
                return;
            }

            dispatch(insertTodo({
                id: Math.max(...todos.map(todo => todo.id), 0) + 1,
                text: inputValue,
                completed: false
            }));
    
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    const handleDelete = (id:number) => {
        dispatch(removeTodo(id));
    };

    const handleCompleteChange = (id:number) => {
        dispatch(editFinished(id));
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Todo List</h2>
            <input ref={inputRef} type="text" className={styles.input} placeholder="할 일을 입력하세요…" onKeyDown={(e) => handleInsertEnter(e)} />
            <button className={styles.addBtn} onClick={handleInsert}>Add</button>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <span className={`${styles.text} ${styles.completed}`}>
                        맛있게 점심먹기!!
                    </span>
                    <button className={styles.deleteBtn}>
                        ❌
                    </button>
                </li>
                <li className={styles.item}>
                    <span className={styles.text}>
                        열심히 운동하기~!!
                    </span>
                    <button className={styles.deleteBtn}>
                        ❌
                    </button>
                </li>
                {
                    todos && todos.map(todo => (
                        <li key={todo.id} className={styles.item}>
                            <span className={
                                todo.completed ? `${styles.text} ${styles.completed}` : `${styles.text}`
                                } onClick={() => handleCompleteChange(todo.id)}>
                                {todo.text}
                            </span>
                            <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(todo.id)}>
                                ❌
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList;