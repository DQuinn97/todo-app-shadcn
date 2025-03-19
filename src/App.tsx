import "./App.css";
import TodoList from "@/components/ui/TodoList";
import { useGetTodosQuery, useGetCategoriesQuery } from "@/store/todoAPI";
import { Category } from "@/lib/types";
import TodoForm from "@/components/ui/TodoForm";
import TodoFilter from "@/components/ui/TodoFilter";
import { getFilters } from "@/store/filterSlice";
import { useSelector } from "react-redux";
import TodoStats from "@/components/ui/TodoStats";

function App() {
  /**
   * Todos get fetched on App level, because json-server is not great and this prevents slow loading and errors.
   * Same with categories.
   * I know this defeats the point of React Toolkit being able to call hooks from within components, but this seemed to work just a little smoother.
   */

  const filters = useSelector(getFilters);
  const {
    data: todoResponse,
    isLoading: todoLoading,
    isError: todoError,
  } = useGetTodosQuery(filters);
  const { data: categories } = useGetCategoriesQuery();

  return (
    <>
      <TodoForm categories={categories as Category[]} todo={undefined} />
      <TodoFilter categories={categories as Category[]} />
      {todoResponse && todoResponse.data && (
        <TodoList
          todoResponse={todoResponse}
          categories={categories as Category[]}
        />
      )}
      {todoLoading && (
        <div className="flex h-40 items-center justify-center text-2xl font-semibold text-gray-500">
          No items yet...
        </div>
      )}
      {todoError && (
        <div className="flex h-40 items-center justify-center text-2xl font-semibold text-gray-500">
          Something went wrong...
        </div>
      )}
      <TodoStats />
    </>
  );
}

export default App;
