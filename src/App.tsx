import "./App.css";
import TodoList from "@/components/ui/TodoList";
import { useGetTodosQuery, useGetCategoriesQuery } from "./store/todoAPI";
import { Category } from "./lib/types";

function App() {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();
  return (
    <>
      {todos && (
        <TodoList todos={todos} categories={categories as Category[]} />
      )}
    </>
  );
}

export default App;
