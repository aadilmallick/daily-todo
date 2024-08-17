import { appStorage } from "app/background/controllers/storageController";
import { useChromeStorage } from "app/utils/ReactUtils";

const useHistory = () => {
  const { data, loading, setValueAndStore } = useChromeStorage(
    appStorage,
    "history"
  );

  const deleteHistory = async (dateString: string) => {
    if (!data) return;
    const newHistory = data.filter((h) => h.date !== dateString);
    await setValueAndStore(newHistory);
  };

  return {
    history: data,
    storageLoading: loading,
    deleteHistory,
  };
};

export default useHistory;
