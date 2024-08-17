import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import PermissionsModel from "./api/permissions";
import PageLoader from "./vanillajs-utils/loaders/PageLoader";

export function injectRoot(app: React.ReactNode) {
  const root = document.createElement("div");
  root.id = "crx-root";
  document.body.append(root);

  createRoot(root).render(<React.StrictMode>{app}</React.StrictMode>);
}

export function createAppWithPageLoader(
  app: React.ReactNode,
  options?: Partial<PageLoader["cssVariables"]>
) {
  async function createApp() {
    injectRoot(app);
  }

  const pageLoader = new PageLoader(options);
  createApp();
  pageLoader.loadPage();
}

export function useObjectState<T extends Record<string, any>>(
  initialState: T
): [T, (newState: Partial<T>) => void] {
  const [state, setState] = React.useState(initialState);

  const setPartialState = React.useCallback((newState: Partial<T>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  return [state, setPartialState];
}

export function useGetCurrentTab() {
  const [tab, setTab] = React.useState<chrome.tabs.Tab | null>(null);

  React.useEffect(() => {
    async function getCurrentTab() {
      const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setTab(currentTab);
    }

    getCurrentTab();
  }, []);

  return { tab };
}

export function useGetOptionalPermissions(
  optionalPermissions: PermissionsModel
) {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    async function checkPerms() {
      const isGranted = await optionalPermissions.permissionIsGranted();
      setPermissionsGranted(isGranted);
    }

    checkPerms();
  }, []);

  return { permissionsGranted, setPermissionsGranted };
}
