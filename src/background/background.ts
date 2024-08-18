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
  },
});

chrome.permissions.onAdded.addListener((permissions) => {
  console.log("Permissions added", permissions);
  setupAlarmListener();
});

// Function to set up the alarm listener if the API is available
function setupAlarmListener() {
  if (chrome.alarms) {
    console.log("chrome.alarms API is available.");
    reminderAlarm.onTriggered(() => {
      console.log("Alarm triggered");
      NotificationModel.showBasicNotification({
        title: "Daily Reminder",
        message: "Don't forget to finish your todos for today!",
        iconPath: "/icon.png",
      });
    });
  } else {
    console.warn("chrome.alarms API is not available.");
  }
}

// Initial setup: attempt to set up the alarm listener
// setupAlarmListener();
