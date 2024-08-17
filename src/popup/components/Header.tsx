import { useMemo } from "react";
import { useApplicationStore } from "../hooks/useApplicationStore";
import { getColor } from "app/utils/projectUtils";

const Header = () => {
  const { todos } = useApplicationStore();
  const completedTodosLength = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );
  const todosLength = useMemo(() => todos.length, [todos]);
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-lg text-blue-400 font-bold">Daily Todos</h1>
      <TodoGrade
        todosCompleted={completedTodosLength}
        totalTodos={todosLength}
      />
    </header>
  );
};

export const TodoGrade = ({
  todosCompleted,
  totalTodos,
}: {
  todosCompleted: number;
  totalTodos: number;
}) => {
  return (
    <div
      className="flex items-center justify-center p-2 rounded-full h-10 w-10 bg-white shadow-lg border-2 border-gray-200 font-semibold text-sm"
      style={{
        color: getColor(todosCompleted, totalTodos),
      }}
    >
      {todosCompleted}/{totalTodos}
    </div>
  );
};

export default Header;
