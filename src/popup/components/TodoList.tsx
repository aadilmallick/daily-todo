import "app/utils/style-utils/components.css";
import { useApplicationStore } from "../hooks/useApplicationStore";
import { useEffect, useState } from "react";
import { Handler, Todo } from "app/background/controllers/storageController";
import { Checkbox } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

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
  return (
    <div className={cn("flex gap-x-1 items-center", checked && "line-through")}>
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
  );
};

export default TodoList;
