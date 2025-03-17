import { Category, Todo } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const TodoItem = ({ todo, category }: { todo: Todo; category: Category }) => {
  const style = {
    backgroundColor: category.color + "77",
    color: category.color,
  };

  return (
    <li className="border-accent flex items-center gap-2 rounded-md border-1 p-3 text-left">
      <Collapsible className="w-full">
        <div className="flex w-full items-center gap-2">
          <Checkbox className="mr-2" />
          <CollapsibleTrigger className="line-clamp-1 flex w-full gap-2">
            <div className="mr-auto line-clamp-1 text-left">{todo.text}</div>
            <Badge className="ml-auto" style={style}>
              {category.name}
            </Badge>
            <span>
              <ChevronDown size={16} />
            </span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {todo?.description || (
            <i className="italic opacity-50">No description...</i>
          )}
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};
export default TodoItem;
