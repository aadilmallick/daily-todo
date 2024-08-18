import { Switch } from "@/components/ui/switch";

import PermissionsModel from "app/utils/api/permissions";
import { useGetOptionalPermissions } from "app/utils/ReactUtils";
import { TimePicker } from "./TimePicker";


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

export default NotificationsSwitch;
