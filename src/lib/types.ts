export interface GetTodoResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Todo[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
  description: string;
}

export interface Category {
  name: string;
  color: string;
}

export type Theme = "dark" | "light" | "system";
