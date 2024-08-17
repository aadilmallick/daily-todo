import NotificationsSwitch from "../components/NotificationsSwitch";
import PageContainer from "../components/PageContainer";

const Options = () => {
  return (
    <PageContainer>
      <div className="p-8">
        <h1 className="text-4xl text-slate-700">Options</h1>
        <div className="mt-8 space-y-4">
          <NotificationsSwitch />
        </div>
      </div>
    </PageContainer>
  );
};

export default Options;
