import { createAppWithPageLoader } from "app/utils/ReactUtils";
import { App } from "./App";

createAppWithPageLoader(<App />, {
  color: "blue",
});
