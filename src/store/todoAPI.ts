import { type Todo } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosAPI = createApi({
  tagTypes: ["Todos"],
  reducerPath: "todosAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/todos",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => `/`,
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query<Todo, Todo["id"]>({
      query: (id) => `/${id}`,
    }),
    addTodo: builder.mutation<
      Todo,
      Pick<Todo, "text" | "category" | "description">
    >({
      query: ({ text, category, description }) => ({
        url: "/",
        method: "POST",
        body: { text, completed: false, category, description },
      }),
      invalidatesTags: ["Todos"],
    }),
    toggleTodo: builder.mutation<Todo, Pick<Todo, "completed" | "id">>({
      query: ({ id, completed }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["Todos"],
    }),
    removeTodo: builder.mutation<Todo, Todo["id"]>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
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
} = todosAPI;
