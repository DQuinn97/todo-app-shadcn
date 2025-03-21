import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFilters, setAmount, setPage } from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { GetTodoResponse } from "@/lib/types";
const Pager = ({ todoResponse }: { todoResponse: GetTodoResponse }) => {
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();
  const pageQty = [5, 10, 15, 20];
  console.log("this", todoResponse);
  console.log(todoResponse[`"last"`]);

  return (
    <div className="mt-5 flex h-8 w-full items-center justify-between">
      <div className="flex items-center justify-between gap-5">
        Show:
        <Select
          defaultValue={"10"}
          onValueChange={(value) => dispatch(setAmount(value))}
          value={String(filters.amount)}
        >
          <SelectTrigger className="hover:cursor-pointer">
            <SelectValue placeholder="10 per page" />
          </SelectTrigger>
          <SelectContent>
            {pageQty?.map((qty) => (
              <SelectItem key={`perpage${qty}`} value={String(qty)}>
                {qty} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Button
          variant={"secondary"}
          className="border-1 p-3"
          disabled={todoResponse[`"first"`] == filters.page}
          onClick={() => dispatch(setPage(todoResponse[`"first"`]))}
        >
          First
        </Button>
        <Button
          variant={"secondary"}
          className="border-1 p-3"
          disabled={todoResponse[`"prev"`] === undefined}
          onClick={() => dispatch(setPage(todoResponse[`"prev"`]))}
        >
          Previous
        </Button>

        <span className="px-2">
          Page{" "}
          {todoResponse[`"prev"`]
            ? +todoResponse[`"prev"`] + 1
            : todoResponse[`"next"`]
              ? +todoResponse[`"next"`] - 1
              : " "}{" "}
          of {todoResponse[`"last"`]}
        </span>
        <Button
          variant={"secondary"}
          className="border-1 p-3"
          disabled={todoResponse[`"next"`] === undefined}
          onClick={() => dispatch(setPage(todoResponse[`"next"`]))}
        >
          Next
        </Button>
        <Button
          variant={"secondary"}
          className="border-1 p-3"
          disabled={todoResponse[`"last"`] == filters.page}
          onClick={() => dispatch(setPage(todoResponse[`"last"`]))}
        >
          Last
        </Button>
      </div>
    </div>
  );
};
export default Pager;
