import {
  getFilters,
  setCategoryFilter,
  setStatusFilter,
} from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category } from "@/lib/types";

const TodoFilter = ({ categories }: { categories: Category[] }) => {
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2">
      <Select
        defaultValue={filters.categoryFilter}
        onValueChange={(value) => dispatch(setCategoryFilter(value))}
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
      <Select
        defaultValue={filters.statusFilter}
        onValueChange={(value) => dispatch(setStatusFilter(value))}
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
    </div>
  );
};
export default TodoFilter;
