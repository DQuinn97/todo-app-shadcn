export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  description: string;
}

export interface Category {
  name: string;
  color: string;
}
