import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts";
import { Todo } from "./contexts/ToDoContext";
import { TodoForm, TodoItem } from "./components";


export default function App() {

  const [todos,setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    todo.id = Date.now(); 
    setTodos((prev: Todo[]) =>  [{...todo} , ...prev])
  }

  const updateTodo = (id: number,todo: Todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => (prev.filter((prevTodo) => prevTodo.id !== id)))
  }

  const toggleComplete = (id: number) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo , isCompleted: !prevTodo.isCompleted} : prevTodo)))
  }

  useEffect(() => {
    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || '[]');
    if(todos && todos.length > 0){
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos));
  }, [todos]);

  return (
    <ToDoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Tasks
        </h1>
        <div className="mb-4"><TodoForm/></div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ToDoProvider>
  );
}
