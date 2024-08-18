import type { History } from "app/background/controllers/storageController";
import useHistory from "../hooks/useHistory";
import { getButtonAccessibilityProps, getColor } from "app/utils/projectUtils";
import { LucideXCircle } from "lucide-react";
import "app/utils/style-utils/components.scss";
import { useCssVariables } from "app/utils/ReactUtils";
import { RadialProgress } from "@/components/ui/radialProgress";
import { useMemo } from "react";

const HistoryList = () => {
  const { history, storageLoading, deleteHistory } = useHistory();
  const todosCompleted = useMemo(() => {
    if (!history) return 0;

    return history.reduce(
      (acc, h) => acc + Number(h.todosFraction.split("/")[0]),
      0
    );
  }, [history]);
  const todosTotal = useMemo(() => {
    if (!history) return 0;

    return history.reduce(
      (acc, h) => acc + Number(h.todosFraction.split("/")[1]),
      0
    );
  }, [history]);

  const percentage = todosTotal > 0 ? todosCompleted / todosTotal : 0;

  if (storageLoading || !history) {
    return null;
  }
  return (
    <div className="p-8 flex flex-wrap">
      <div className="space-y-2 flex-1 max-h-[500px] overflow-y-auto fancy-scroll min-w-64">
        {history
          .map((h) => (
            <HistoryItem
              key={h.date}
              history={h}
              historyLoading={storageLoading}
              deleteHistory={deleteHistory}
            />
          ))
          .reverse()}
      </div>
      <div className="flex-1 p-2 space-y-2 flex flex-col items-center">
        <h2 className="text-slate-700 text-3xl text-center font-bold">Grade</h2>
        <div className="bg-slate-200 shadow-lg p-1 rounded-xl min-w-64">
          <RadialProgress
            percentage={todosTotal > 0 ? todosCompleted / todosTotal : 0}
            color={
              percentage < 0.5 ? "red" : percentage < 0.9 ? "yellow" : "green"
            }
            subText={`${todosCompleted}/${todosTotal} All Time`}
          />
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({
  history,
  deleteHistory,
  historyLoading,
}: {
  history: History;
  deleteHistory: (dateString: string) => Promise<void>;
  historyLoading: boolean;
}) => {
  const todosCompleted = Number(history.todosFraction.split("/")[0]);
  const todosTotal = Number(history.todosFraction.split("/")[1]);
  return (
    <div className="p-2 rounded-md bg-slate-300 text-slate-600 flex justify-between items-center max-w-96">
      <div className="flex gap-x-4">
        <p>{history.date}</p>
        <p
          style={{
            color: getColor(todosCompleted, todosTotal),
          }}
        >
          {history.todosFraction}
        </p>
      </div>
      <LucideXCircle
        className="cursor-pointer text-slate-600 hover:text-red-500 transition-colors focus:text-red-500 focus:outline-red-700"
        {...getButtonAccessibilityProps(async () => {
          if (historyLoading) return;
          const shouldDelete = confirm(
            "Are you sure you want to delete this history? You will not be able to recover it."
          );
          shouldDelete && (await deleteHistory(history.date));
        })}
      />
    </div>
  );
};

export default HistoryList;
