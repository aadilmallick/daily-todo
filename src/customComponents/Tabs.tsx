import React from "react";
import "./tabs.css";

interface ReactTab {
  tab: string;
  element: React.ReactNode;
}

const Tabs = ({ tabs }: { tabs: ReactTab[] }) => {
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  return (
    <>
      <div id="tabs">
        {tabs.map((t) => (
          <button
            key={t.tab}
            className={`tab ${currentTab.tab === t.tab ? "active" : ""}`}
            onClick={() => setCurrentTab(t)}
          >
            {t.tab}
          </button>
        ))}
      </div>
      <div className="content">{currentTab.element}</div>
    </>
  );
};

export default Tabs;
