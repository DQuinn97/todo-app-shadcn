import "./App.css";
import TodoList from "@/components/ui/TodoList";
import { useGetTodosQuery, useGetCategoriesQuery } from "./store/todoAPI";
import { Category } from "./lib/types";
import TodoForm from "@/components/ui/TodoForm";
import TodoFilter from "@/components/ui/FilterForm";

function App() {
  const { data: todos } = useGetTodosQuery({});
  const { data: categories } = useGetCategoriesQuery();
  return (
    <>
      <TodoForm categories={categories as Category[]} />
      <TodoFilter categories={categories as Category[]} />
      {todos && (
        <TodoList todos={todos} categories={categories as Category[]} />
      )}
    </>
  );
}

export default App;
