import { Category, GetTodoResponse, Todo } from "@/lib/types";
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
      <ul className="flex flex-col gap-2">
        {todoResponse?.data.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            category={
              categories?.find((c) => c.name === todo.category) || {
                name: "",
                color: "",
              }
            }
          />
        ))}
      </ul>
      <Pager todoResponse={todoResponse} />
    </>
  );
};
export default TodoList;
