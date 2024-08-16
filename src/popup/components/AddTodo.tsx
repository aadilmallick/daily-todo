import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { LucideCheckSquare } from "lucide-react";
import { useState } from "react";
import { useApplicationStore } from "../hooks/useApplicationStore";
import { Handler } from "app/background/controllers/storageController";

const AddTodo = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const { addTodo } = useApplicationStore();

  // pushes changes to state and backend
  async function onAddTodo() {
    const id = crypto.randomUUID();
    const todoToAdd = {
      completed: false,
      id,
      title: newTodo || "New Todo",
    };
    addTodo(todoToAdd);
    await Handler.addTodo(todoToAdd);
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
              "bg-none text-gray-600 flex-1 px-1 rounded",
              "border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:bg-slate-200 placeholder:text-gray-400"
            )}
            placeholder="Add a todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <LucideCheckSquare
            onClick={onAddTodo}
            size={20}
            color="gray"
            role="button"
            className="cursor-pointer hover:opacity-75 transition-opacity"
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
