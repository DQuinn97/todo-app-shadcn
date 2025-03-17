import { Category, type Todo } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosAPI = createApi({
  tagTypes: ["Todos"],
  reducerPath: "todosAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => `/todos`,
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
  }),
});

export default todosAPI;

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useRemoveTodoMutation,
  useGetCategoriesQuery,
} = todosAPI;
