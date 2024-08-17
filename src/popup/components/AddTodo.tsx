import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { LucideCheckSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApplicationStore } from "../hooks/useApplicationStore";
import { StorageHandler } from "app/background/controllers/storageController";
import { getButtonAccessibilityProps } from "app/utils/projectUtils";

const AddTodo = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const { addTodo } = useApplicationStore();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isAdding) {
      ref.current?.focus();
    }
  }, [isAdding, ref]);

  // pushes changes to state and backend
  async function onAddTodo() {
    const id = crypto.randomUUID();
    const todoToAdd = {
      completed: false,
      id,
      title: newTodo || "New Todo",
    };
    addTodo(todoToAdd);
    await StorageHandler.addTodo(todoToAdd);
    setNewTodo("");
    setIsAdding(false);
  }

  return (
    <div className="flex flex-col gap-2">
      {isAdding && (
        <div className="flex gap-x-1 items-center bg-slate-50">
          <Checkbox disabled color="gray" />
          <input
            type="text"
            className={cn(
              "bg-none text-gray-600 flex-1 px-1 rounded text-ellipsis",
              "border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:bg-slate-200 placeholder:text-gray-400"
            )}
            placeholder="Add a todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            ref={ref}
            maxLength={60}
          />
          <LucideCheckSquare
            size={20}
            color="gray"
            className="cursor-pointer hover:opacity-75 transition-opacity"
            {...getButtonAccessibilityProps(onAddTodo)}
          />
        </div>
      )}
      {/* clicking on button adds new todo row */}
      <Button
        className="text-center"
        size={"sm"}
        onClick={() => {
          setIsAdding(true);
        }}
        disabled={isAdding}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
