import { Category, type GetTodoResponse } from "@/lib/types";
import TodoItem from "@/components/ui/TodoItem";
import Pager from "@/components/ui/Pager";

const TodoList = ({
  todoResponse,
  categories,
}: {
  todoResponse: GetTodoResponse;
  categories: Category[];
}) => {
  return (
    <>
      <ul className="mt-5 flex flex-col gap-2">
        {todoResponse?.data.map((todo) => (
          <TodoItem key={todo.id} todo={todo} categories={categories} />
        ))}
      </ul>
      <Pager todoResponse={todoResponse} />
    </>
  );
};
export default TodoList;
