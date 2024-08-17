import type { History } from "app/background/controllers/storageController";
import useHistory from "../hooks/useHistory";
import { getColor } from "app/utils/projectUtils";

const HistoryList = () => {
  const { history, storageLoading } = useHistory();

  if (storageLoading || !history) {
    return null;
  }
  return (
    <div className="p-8 space-y-2">
      {history.map((h) => (
        <HistoryItem key={h.date} history={h} />
      ))}
    </div>
  );
};

const HistoryItem = ({ history }: { history: History }) => {
  const todosCompleted = Number(history.todosFraction.split("/")[0]);
  const todosTotal = Number(history.todosFraction.split("/")[1]);
  return (
    <div className="p-2 rounded-md bg-slate-300 text-slate-600 flex justify-between items-center max-w-96">
      <p>{history.date}</p>
      <p
        style={{
          color: getColor(todosCompleted, todosTotal),
        }}
      >
        {history.todosFraction}
      </p>
    </div>
  );
};

export default HistoryList;
