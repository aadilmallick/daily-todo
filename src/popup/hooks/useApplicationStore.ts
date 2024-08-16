import type { Todo } from "app/background/controllers/storageController";
import { create } from "zustand";

type WithKeys<T, V extends keyof T> = {
  [K in V]: T[K];
};

type WithoutKeys<T, V extends keyof T> = {
  [K in Exclude<keyof T, V>]: T[K];
};

interface Store {
  todos: Todo[];
  setTodos: (todos: Store["todos"]) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    todo: Partial<WithKeys<Todo, "title" | "completed">>
  ) => void;
}

export const useApplicationStore = create<Store>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  updateTodo: (id, todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t)),
    })),
}));
