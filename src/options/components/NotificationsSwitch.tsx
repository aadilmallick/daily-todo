import { Switch } from "@/components/ui/switch";

import PermissionsModel from "app/utils/api/permissions";
import {
  useChromeStorage,
  useGetOptionalPermissions,
} from "app/utils/ReactUtils";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { reminderAlarm } from "app/background/controllers/alarmController";
import NotificationModel from "app/utils/api/notifications";
import { ChromeAlarm } from "app/utils/api/alarms";
import { DateModel } from "app/utils/projectUtils";
import {
  appSettingsStorage,
  StorageHandler,
} from "app/background/controllers/storageController";
import { Button } from "@/components/ui/button";
import { optionsToastManager } from "../optionsToaster";

const optionalPermissions = new PermissionsModel({
  permissions: ["notifications", "alarms"],
});

const NotificationsSwitch = () => {
  const { permissionsGranted, setPermissionsGranted } =
    useGetOptionalPermissions(optionalPermissions);
  return (
    <>
      <div className="flex gap-4">
        <Switch
          id="notifications"
          onCheckedChange={async (checked) => {
            setPermissionsGranted(checked);
            if (checked) {
              await optionalPermissions.requestAndExecuteCallback((granted) => {
                if (!granted) setPermissionsGranted(false);
              });
            }
            if (!checked) {
              const permissionsWereGranted =
                await optionalPermissions.permissionIsGranted();
              if (permissionsWereGranted) await optionalPermissions.remove();
            }
          }}
          checked={permissionsGranted}
        />
        <label
          htmlFor="notifications"
          className="text-slate-800 text-base max-w-[60ch]"
        >
          Get notifications?
          <br />
          <span className="text-slate-500">
            Will send notifications every day at your desired time to remind you
            to finish your todos and lets you know how well you did each day.
          </span>
        </label>
      </div>
      {permissionsGranted && <TimePicker />}
    </>
  );
};

const TimePicker = () => {
  const [time, setTime] = useState("22:30");
  const {
    data: storedTime,
    loading: storageLoading,
    setValueAndStore: updateStoredTime,
  } = useChromeStorage(appSettingsStorage, "notificationsTime");
  const minTime = "06:00";
  const maxTime = "23:30";

  const timeIsValid = useMemo(() => {
    return time >= minTime && time <= maxTime;
  }, [time]);

  async function onTimeChange() {
    await updateStoredTime(time);
    await reminderAlarm.createAlarm({
      periodInMinutes: 60 * 24,
      when: DateModel.convertTimeToDate(time).getTime(),
    });
    optionsToastManager.success("Time saved successfully!");
  }

  useEffect(() => {
    // wait until stored time is defined, then use that to set time.

    if (!storedTime) return;
    setTime(storedTime);
  }, [storedTime]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 items-start rounded-lg  p-4 w-fit",
        styles.glassmorphismCard
      )}
    >
      <input
        aria-label="Time"
        type="time"
        className="p-1 rounded-lg bg-slate-100 border-2 border-slate-300 w-32 disabled:bg-slate-300 transition-colors disabled:opacity-50"
        onChange={(e) => {
          setTime(e.target.value);
        }}
        value={time}
        id="time"
        disabled={storageLoading}
      />
      <label htmlFor="time" className="text-slate-800 text-base max-w-[60ch]">
        Set Notification Time
        <br />
        <span className="text-slate-500">
          Set a time to get reminded to finish your todos. Every day at
          midnight, the todos clear and a new day is added to your history.
        </span>
      </label>
      <ul>
        <li
          className={cn(
            "text-blue-500 text-xs transition-colors",
            timeIsValid ? "text-blue-500" : "text-red-500"
          )}
        >
          The earliest time you can set is 6:00 AM and the latest time you can
          set is 11:30 PM.
        </li>
      </ul>
      <Button
        onClick={async () => {
          await onTimeChange();
        }}
        disabled={!timeIsValid || time === storedTime || storageLoading}
        className="disabled:opacity-50"
      >
        Save Time
      </Button>
    </div>
  );
};

export default NotificationsSwitch;
