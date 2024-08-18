export function getPercentage(completed: number, total: number) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getColor(todosCompleted: number, totalTodos: number) {
  const percentage = getPercentage(todosCompleted, totalTodos);
  if (percentage === 0) return "gray";
  if (percentage < 50) return "red";
  if (percentage < 90) return "orange";
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

export class DateModel {
  static convertTimeToDate(time: string) {
    const date = new Date();
    const [hours, minutes] = time.split(":");
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
  }

  static convertDateToTime(dateMillis: number) {
    const date = new Date(dateMillis);
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
