import { LocalStorage, SyncStorage } from "app/utils/api/storage";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface History {
  date: string;
  todosFraction: `${number}/${number}`;
}

export const appStorage = new LocalStorage({
  dailyTodos: [] as Todo[],
  history: [] as History[],
});

export const appSettingsStorage = new SyncStorage({
  notificationsTime: "22:30",
});

// define static methods here
export class StorageHandler {
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

  static async deleteTodo(id: string) {
    const todos = await appStorage.get("dailyTodos");
    const updatedTodos = todos.filter((t) => t.id !== id);
    await appStorage.set("dailyTodos", updatedTodos);
  }

  static async resetTodos() {
    await appStorage.set("dailyTodos", []);
  }

  static async addHistory(history: History) {
    const histories = await appStorage.get("history");
    await appStorage.set("history", [...histories, history]);
  }

  static async saveNotificationsTime(time: string) {
    await appSettingsStorage.set("notificationsTime", time);
  }
}
