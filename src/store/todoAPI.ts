import { Category, type GetTodoResponse, type Todo } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosAPI = createApi({
  tagTypes: ["Todos"],
  reducerPath: "todosAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
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
        `/todos?${categoryFilter ? `category=${categoryFilter}&` : ""}${statusFilter ? `completed=${statusFilter == "Done" ? true : false}&` : ""}${page ? `_page=${page}&` : ""}${amount ? `_per_page=${amount}` : ""}`,
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
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, Omit<Todo, "completed">>({
      query: ({ text, category, description, id }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { text, category, description },
      }),
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
      invalidatesTags: ["Todos"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories`,
    }),
    getTodoStats: builder.query<{ completed: number; total: number }, void>({
      query: () => `/todos`,
      transformResponse: (response: Todo[]) => ({
        completed: response.filter((todo) => todo.completed).length,
        total: response.length,
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
