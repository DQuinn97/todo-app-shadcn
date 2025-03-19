import "./App.css";
import TodoList from "@/components/ui/TodoList";
import { useGetTodosQuery, useGetCategoriesQuery } from "./store/todoAPI";
import { Category } from "./lib/types";
import TodoForm from "@/components/ui/TodoForm";
import TodoFilter from "@/components/ui/TodoFilter";
import { getFilters } from "./store/filterSlice";
import { useSelector } from "react-redux";

function App() {
  const filters = useSelector(getFilters);
  const { data: todoResponse } = useGetTodosQuery(filters);
  const { data: categories } = useGetCategoriesQuery();

  return (
    <>
      <TodoForm categories={categories as Category[]} />
      <TodoFilter categories={categories as Category[]} />
      {todoResponse && todoResponse.data && (
        <TodoList
          todoResponse={todoResponse}
          categories={categories as Category[]}
        />
      )}
      {(!todoResponse || !todoResponse.data) && (
        <div className="flex h-40 items-center justify-center text-2xl font-semibold text-gray-500">
          No items yet...
        </div>
      )}
    </>
  );
}

export default App;
