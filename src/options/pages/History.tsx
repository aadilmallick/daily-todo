import Tabs from "app/customComponents/Tabs";
import PageContainer from "../components/PageContainer";
import HistoryList from "../components/HistoryList";

const History = () => {
  return (
    <PageContainer>
      <Tabs
        tabs={[
          {
            tab: "History",
            element: <HistoryList />,
          },
          {
            tab: "Stats",
            element: <div>Stats</div>,
          },
        ]}
        inactiveTabColor="rgba(65, 99, 210, 0.5)"
        tabColor="rgb(65, 99, 210)"
      />
    </PageContainer>
  );
};

export default History;
