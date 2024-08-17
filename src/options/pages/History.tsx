import Tabs from "app/customComponents/Tabs";
import PageContainer from "../components/PageContainer";

const History = () => {
  return (
    <PageContainer>
      <Tabs
        tabs={[
          {
            tab: "History",
            element: <div>History</div>,
          },
          {
            tab: "Stats",
            element: <div>Stats</div>,
          },
        ]}
      />
    </PageContainer>
  );
};

export default History;
