import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../type/todo";

const todoSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        insertTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id != action.payload);
        },
        editFinished: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id == action.payload) {
                    todo.completed = todo.completed == false;
                    return todo;
                } else {
                    return todo;
                }
            });
        }
    }
});

export const {insertTodo, removeTodo, editFinished} = todoSlice.actions;
export default todoSlice.reducer;