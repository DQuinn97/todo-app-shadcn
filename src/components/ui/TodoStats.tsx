import { useGetTodoStatsQuery } from "@/store/todoAPI";

const TodoStats = () => {
  const stats = useGetTodoStatsQuery();
  return (
    <div className="mt-5 flex justify-between border-t-1 pt-3 text-sm text-gray-400">
      {stats?.data && (
        <>
          <div>Total: {stats?.data?.total} todos</div>
          <div>Active: {stats?.data?.active} todos</div>
          <div>Completed: {stats?.data?.completed} todos</div>
          <div> {stats?.data?.percentage}% completed</div>
        </>
      )}
    </div>
  );
};
export default TodoStats;
