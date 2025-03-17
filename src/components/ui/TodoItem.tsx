import { Category, Todo } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, PenIcon, Trash as CrossIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRemoveTodoMutation } from "@/store/todoAPI";

const TodoItem = ({ todo, category }: { todo: Todo; category: Category }) => {
  const [removeTodo] = useRemoveTodoMutation();
  const style = {
    backgroundColor: category.color + "77",
    color: category.color,
  };

  return (
    <li className="border-accent flex items-center justify-center rounded-md border-1 p-3 text-left">
      <Collapsible className="w-full">
        <div className="flex w-full items-center justify-center gap-2">
          <Checkbox className="mr-2" />
          <CollapsibleTrigger className="OpenTodo line-clamp-1 flex w-full gap-2">
            <div className="mr-auto line-clamp-1 text-left">{todo.text}</div>
            {todo.category && (
              <Badge className="ml-auto" style={style}>
                {category.name}
              </Badge>
            )}
            <span className="OpenTodoIcon hover:bg-muted flex w-8 items-center justify-center rounded-[0.2rem] p-2">
              <ChevronDown size={16} />
            </span>
          </CollapsibleTrigger>
          <Button variant="ghost">
            <PenIcon />
          </Button>
          <Button variant="ghost" onClick={() => removeTodo(todo.id)}>
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
