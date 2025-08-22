export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export type TodoState = {
    todos: Todo[];
};

export const initialState: TodoState = {
    todos: [],
};