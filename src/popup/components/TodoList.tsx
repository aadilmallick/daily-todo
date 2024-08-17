import "app/utils/style-utils/components.scss";
import { useApplicationStore } from "../hooks/useApplicationStore";
import { useEffect, useState } from "react";
import {
  StorageHandler,
  Todo,
} from "app/background/controllers/storageController";
import { cn } from "@/lib/utils";
import { LucideXCircle } from "lucide-react";
import { getButtonAccessibilityProps } from "app/utils/projectUtils";
import { LocalStorageBrowser } from "app/utils/vanillajs-utils/domUtils";

const localStore = new LocalStorageBrowser<{
  date: string; // the date string
}>("date");

const TodoList = () => {
  const { todos, setTodos } = useApplicationStore();

  useEffect(() => {
    async function fetchTodos() {
      let storedDate = localStore.get("date");
      console.log(storedDate);
      if (!storedDate) {
        localStore.set("date", new Date().toDateString());
      }
      storedDate = localStore.get("date");
      // if today is a new day, reset todos and add to history
      if (storedDate !== new Date().toDateString()) {
        // 1. add to history
        const fetchedTodos = await StorageHandler.getTodos();
        const numCompletedTodos = fetchedTodos.filter(
          (todo) => todo.completed
        ).length;
        const numTodos = fetchedTodos.length;
        await StorageHandler.addHistory({
          date: new Date().toDateString(),
          todosFraction: `${numCompletedTodos}/${numTodos}`,
        });

        // 2. reset todos
        localStore.set("date", new Date().toDateString());
        await StorageHandler.resetTodos();
        setTodos([]);
      }

      // else if same day, just fetch todos for the day
      else {
        const fetchedTodos = await StorageHandler.getTodos();
        setTodos(fetchedTodos);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className="p-2 my-2 max-h-96 min-h-16 overflow-y-auto fancy-scroll overflow-x-hidden">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [checked, setChecked] = useState(todo.completed);
  const { deleteTodo, updateTodo } = useApplicationStore();
  return (
    <div
      className={cn(
        "flex justify-between items-center px-1 py-2 bg-slate-200 border-b-2 border-slate-500 max-w-full",
        checked && "line-through"
      )}
    >
      <div className="flex flex-1 gap-x-1 items-center">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            StorageHandler.updateTodo({
              ...todo,
              completed: e.target.checked,
            });
            updateTodo(todo.id, {
              completed: e.target.checked,
            });
          }}
        />
        <label
          className="text-gray-700 font-semibold block max-w-[20ch] line-clamp-3 text-ellipsis"
          htmlFor={`todo-${todo.id}`}
        >
          {todo.title}
        </label>
      </div>
      <LucideXCircle
        className="cursor-pointer text-slate-600 hover:text-red-500 transition-colors focus:text-red-500 focus:outline-red-700"
        {...getButtonAccessibilityProps(async () => {
          deleteTodo(todo.id);
          await StorageHandler.deleteTodo(todo.id);
        })}
      />
    </div>
  );
};

export default TodoList;
