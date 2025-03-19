import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Category, Todo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useAddTodoMutation } from "@/store/todoAPI";

const formSchema = z.object({
  text: z.string().min(1, "Can't add empty todo"),
  category: z.string().optional(),
  description: z.string(),
});

const TodoForm = ({
  categories,
  todo = undefined,
}: {
  todo: Todo | undefined;
  categories: Category[];
}) => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useAddTodoMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: todo?.text || "",
      category: todo?.category || "",
      description: todo?.description || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();
    if (todo) {
      updateTodo(values);
    } else {
      addTodo(values);
    }
    form.reset();
    form.setValue("category", "");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 flex gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Add todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="hover:cursor-pointer">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hover:cursor-pointer">
          {todo ? (
            "Save changes"
          ) : (
            <>
              <span className="translate-y-[-2px] pr-2 text-xl font-bold">
                +
              </span>{" "}
              Add
            </>
          )}
        </Button>
        {todo && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <textarea {...field}>{todo.description}</textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
};
export default TodoForm;
