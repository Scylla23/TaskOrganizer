import { createContext, useContext } from "react";

export interface Todo{
    id: number;
    title: string;
    isCompleted: boolean;
}

export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            title: "Todo title",
            isCompleted: false,
        }
    ] as Todo[] ,
    addTodo: (_todo: Todo) => {},
    updateTodo: (_id: number , _todo: Todo) => {},
    deleteTodo: (_id: number) => {},
    toggleComplete: (_id: number) => {}
    
});

export const ToDoProvider = ToDoContext.Provider;

export const useToDo = () => {
    return useContext(ToDoContext);
}