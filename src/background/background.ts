import { Runtime } from "app/utils/api/runtime";
import { appStorage } from "./controllers/storageController";

Runtime.onInstall({
  // runs first time you download the extension
  installCb: async () => {
    console.log("Extension installed");
  },
  // runs every time you update the extension or refresh it
  updateCb: async () => {
    console.log("Extension updated");
  },
  onAll: async () => {
    await appStorage.setup();
    console.log("Extension loaded");
    console.log(await appStorage.getAll());
  },
});
