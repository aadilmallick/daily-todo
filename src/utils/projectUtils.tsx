export function getPercentage(completed: number, total: number) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getColor(todosCompleted: number, totalTodos: number) {
  const percentage = getPercentage(todosCompleted, totalTodos);
  if (percentage === 0) return "gray";
  if (percentage < 50) return "red";
  if (percentage < 90) return "yellow";
  if (percentage < 100) return "green";
  return "steelblue";
}

export function getButtonAccessibilityProps<T>(cb: () => void) {
  return {
    onClick: cb,
    onKeyDown: (e: React.KeyboardEvent<T>) => {
      if (e.key === "Enter") {
        cb();
      }
    },
    tabIndex: 0,
    role: "button",
  };
}
