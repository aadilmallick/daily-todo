import { Runtime } from "app/utils/api/runtime";
import {
  appSettingsStorage,
  appStorage,
} from "./controllers/storageController";
import { reminderAlarm } from "./controllers/alarmController";
import NotificationModel from "app/utils/api/notifications";

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
    await appSettingsStorage.setup();
    console.log("Extension loaded");
    console.log(await appStorage.getAll());
    console.log(await appSettingsStorage.getAll());
  },
});

reminderAlarm.onTriggered(() => {
  console.log("Alarm triggered");
  NotificationModel.showBasicNotification({
    title: "Daily Reminder",
    message: "Don't forget to finish your todos for today!",
    iconPath: "public/icon.png",
  });
});
