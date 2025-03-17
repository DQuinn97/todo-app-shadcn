import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

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
import { Category } from "@/lib/types";

const formSchema = z.object({
  categoryFilter: z.string(),
  statusFilter: z.string(),
});

const FilterForm = ({ categories }: { categories: Category[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryFilter: "All",
      statusFilter: "All",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();
    console.log("test");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 flex gap-2">
        <FormField
          control={form.control}
          name="categoryFilter"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="hover:cursor-pointer">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"All"}>All Categories</SelectItem>
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
        <FormField
          control={form.control}
          name="statusFilter"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="hover:cursor-pointer">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"All"}>All Status</SelectItem>
                    <SelectItem value={"Done"}>Done</SelectItem>
                    <SelectItem value={"Not done"}>Not done</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default FilterForm;
