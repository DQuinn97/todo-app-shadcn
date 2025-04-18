import { Category, type GetTodoResponse, type Todo } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

/**
 * API for fetching todos
 * Queries are made specifically to work with the json-server query options.
 * Any weirdness can be blamed on json-server...
 */

const todosAPI = createApi({
  tagTypes: ["Todos"],
  reducerPath: "todosAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://qr-todo-app-shadcn.glitch.me",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<
      GetTodoResponse,
      {
        categoryFilter?: string;
        statusFilter?: string;
        page?: number;
        amount?: number;
      }
    >({
      query: ({ categoryFilter, statusFilter, page, amount }) =>
        `/todos?${categoryFilter ? `category=${categoryFilter}&` : ""}${statusFilter ? `completed=${statusFilter == "Done" ? true : false}&` : ""}${page ? `_page=${page}&` : ""}${amount ? `_limit=${amount}` : ""}`,
      transformResponse: async (response: Todo[], meta) => {
        const pageRegex = /_page=\d+/gm;
        const relRegex = /rel="\w+"/gm;

        let link = meta?.response?.headers?.get("Link")?.split(",");

        let pageData = link
          ?.map((l) => {
            let relMatch = l.match(relRegex);
            let pageMatch = l.match(pageRegex);

            let rel = relMatch ? relMatch[0].replace("rel=", "") : "";
            let page = pageMatch ? pageMatch[0].replace("_page=", "") : "";
            const pageData = {
              [`${rel}`]: page ? page : 1,
            };

            return pageData;
          })
          .reduce((a, b) => ({ ...a, ...b }), {});
        return { ...pageData, data: response } as GetTodoResponse;
      },
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query<Todo, Todo["id"]>({
      query: (id) => `/todos/${id}`,
    }),
    addTodo: builder.mutation<
      Todo,
      Pick<Todo, "text" | "category" | "description">
    >({
      query: ({ text, category, description }) => ({
        url: "/todos",
        method: "POST",
        body: { text, completed: false, category, description },
      }),

      transformResponse: (response: Todo) => {
        toast.success("Todo added successfully", { richColors: true });
        return response;
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, Omit<Todo, "completed">>({
      query: ({ text, category, description, id }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { text, category, description },
      }),
      transformResponse: (response: Todo) => {
        toast.success("Todo updated!", { richColors: true });
        return response;
      },
      invalidatesTags: ["Todos"],
    }),
    toggleTodo: builder.mutation<Todo, Pick<Todo, "completed" | "id">>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["Todos"],
    }),
    removeTodo: builder.mutation<Todo, Todo["id"]>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: Todo) => {
        toast.warning(`Todo deleted successfully!`, {
          richColors: true,
        });
        return response;
      },
      invalidatesTags: ["Todos"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories`,
    }),
    getTodoStats: builder.query<
      { completed: number; total: number; active: number; percentage: number },
      void
    >({
      query: () => `/todos`,
      transformResponse: (response: Todo[]) => ({
        completed: response.filter((todo) => todo.completed).length,
        active: response.filter((todo) => !todo.completed).length,
        total: response.length,
        percentage: Math.round(
          (response.filter((todo) => todo.completed).length / response.length) *
            100,
        ),
      }),
      providesTags: ["Todos"],
    }),
  }),
});

export default todosAPI;

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useToggleTodoMutation,
  useRemoveTodoMutation,
  useGetCategoriesQuery,
  useGetTodoStatsQuery,
} = todosAPI;
