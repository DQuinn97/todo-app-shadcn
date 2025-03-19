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
import { useAddTodoMutation, useUpdateTodoMutation } from "@/store/todoAPI";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

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
  const [updateTodo] = useUpdateTodoMutation();

  const defaultValues = {
    text: todo?.text || "",
    category: todo?.category || "",
    description: todo?.description || "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();
    if (todo) {
      updateTodo({ ...values, id: todo.id });
    } else {
      addTodo(values);
      form.reset(defaultValues);
      // form.setValue("category", "");
    }
  }
  useEffect(() => {
    form.reset(defaultValues);
  }, [todo]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5">
        <div className="mb-5 flex gap-2">
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
        </div>
        {todo && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-fit flex-1">
                <FormControl>
                  <Textarea placeholder="Add description..." {...field}>
                    {todo.description}
                  </Textarea>
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
