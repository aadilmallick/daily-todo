import { LocalStorage } from "app/utils/api/storage";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface History {
  id: string;
  date: string;
  todosFraction: `${number}/${number}`;
}

export const appStorage = new LocalStorage({
  dailyTodos: [] as Todo[],
  history: [] as History[],
});

// define static methods here
export class Handler {
  static async addTodo(todo: Todo) {
    const todos = await appStorage.get("dailyTodos");
    await appStorage.set("dailyTodos", [...todos, todo]);
  }

  static async getTodos(): Promise<Todo[]> {
    return await appStorage.get("dailyTodos");
  }

  static async updateTodo(todo: Todo) {
    const todos = await appStorage.get("dailyTodos");
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    await appStorage.set("dailyTodos", updatedTodos);
  }
}
