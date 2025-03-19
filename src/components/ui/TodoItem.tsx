import { Category, Todo } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, PenIcon, Trash as CrossIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRemoveTodoMutation, useToggleTodoMutation } from "@/store/todoAPI";

const TodoItem = ({ todo, category }: { todo: Todo; category: Category }) => {
  const [removeTodo] = useRemoveTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const style = {
    backgroundColor: category.color + "77",
    color: category.color,
  };
  let li_class = todo.completed ? "bg-muted" : "";
  let text_class = todo.completed ? "line-through text-gray-400" : "";
  return (
    <li
      className={cn(
        "border-accent flex items-center justify-center rounded-md border-1 p-3 text-left",
        li_class,
      )}
      data-active={todo.completed}
    >
      <Collapsible className="w-full">
        <div className="flex w-full items-center justify-center gap-2">
          <Checkbox
            className="mr-2"
            onClick={() =>
              toggleTodo({ id: todo.id, completed: !todo.completed })
            }
            checked={todo.completed}
          />
          <CollapsibleTrigger className="OpenTodo line-clamp-1 flex w-full gap-2">
            <div className="mr-auto line-clamp-1 text-left">
              <span className={cn("line-clamp-1", text_class)}>
                {todo.text}
              </span>
            </div>
            {todo.category && (
              <Badge className="ml-auto" style={style}>
                {category.name}
              </Badge>
            )}
            <span className="OpenTodoIcon hover:bg-muted flex w-8 items-center justify-center rounded-[0.2rem] p-2">
              <ChevronDown size={16} />
            </span>
          </CollapsibleTrigger>
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={() => {}}
          >
            <PenIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={() => removeTodo(todo.id)}
            className="hover:cursor-pointer"
          >
            <CrossIcon />
          </Button>
        </div>
        <CollapsibleContent className="mt-2 flex gap-2 border-t-1 pt-2 pl-4">
          <div>&gt;</div>
          <div>
            {todo?.description || (
              <i className="italic opacity-50">No description...</i>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};
export default TodoItem;
