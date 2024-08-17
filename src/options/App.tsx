import "../utils/style-utils/globals.css";
import "./options.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Options from "./pages/Options";
import AppSidebar from "./pages/AppSidebar";
import History from "./pages/History";
import PageContainer from "./components/PageContainer";

export const App = () => {
  return (
    <>
      <Router>
        <AppSidebar />
        <Routes>
          <Route path="/" element={<Options />} />
          <Route path="/history" element={<History />} />
          <Route
            path="*"
            element={
              <PageContainer>
                <div className="p-4 w-full h-full flex justify-center items-center">
                  <h1 className="text-4xl text-black font-medium">
                    404 Not Found
                  </h1>
                </div>
              </PageContainer>
            }
          />
        </Routes>
      </Router>
    </>
  );
};
