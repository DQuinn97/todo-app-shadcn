import { Category, Todo } from "@/lib/types";
import TodoItem from "@/components/ui/TodoItem";

const TodoList = ({
  todos,
  categories,
}: {
  todos: Todo[];
  categories: Category[];
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {todos?.map((todo) => (
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
  );
};
export default TodoList;
