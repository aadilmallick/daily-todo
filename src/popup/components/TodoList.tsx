import "app/utils/style-utils/components.css";
import { useApplicationStore } from "../hooks/useApplicationStore";
import { useEffect, useState } from "react";
import { Handler, Todo } from "app/background/controllers/storageController";
import { Checkbox } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { LucideXCircle } from "lucide-react";

const TodoList = () => {
  const { todos, setTodos } = useApplicationStore();

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await Handler.getTodos();
      setTodos(fetchedTodos);
    }

    fetchTodos();
  }, []);

  return (
    <div className="p-2 max-h-96 min-h-16 overflow-y-auto">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [checked, setChecked] = useState(todo.completed);
  const { deleteTodo } = useApplicationStore();
  return (
    <div
      className={cn(
        "flex justify-between items-center px-1 py-2 bg-slate-200 border-b-2 border-slate-500",
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
            Handler.updateTodo({
              ...todo,
              completed: e.target.checked,
            });
          }}
        />
        <label
          className="text-gray-700 font-semibold block flex-1"
          htmlFor={`todo-${todo.id}`}
        >
          {todo.title}
        </label>
      </div>
      <LucideXCircle
        className="cursor-pointer text-white hover:text-red-500 transition-colors"
        onClick={async () => {
          deleteTodo(todo.id);
          await Handler.deleteTodo(todo.id);
        }}
      />
    </div>
  );
};

export default TodoList;
