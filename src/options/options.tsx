import { createAppWithPageLoader } from "app/utils/ReactUtils";
import { App } from "./App";
import { optionsToastManager } from "./optionsToaster";

createAppWithPageLoader(<App />, {
  color: "steelblue",
});

optionsToastManager.setup();
