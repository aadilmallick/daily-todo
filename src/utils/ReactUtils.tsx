import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import PermissionsModel from "./api/permissions";
import PageLoader from "./vanillajs-utils/loaders/PageLoader";
import { ChromeStorage } from "./api/storage";

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

export function useChromeStorage<T extends Record<string, any>>(
  storage: ChromeStorage<T>,
  key: keyof T
) {
  const [value, setValue] = React.useState<T[keyof T] | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function getValue() {
      setLoading(true);
      const data = await storage.get(key);
      setValue(data);
      setLoading(false);
    }

    getValue();
  }, []);

  async function setValueAndStore(newValue: T[keyof T]) {
    setLoading(true);
    await storage.set(key, newValue);
    setValue(newValue);
    setLoading(false);
  }

  return { data: value, loading, setValueAndStore };
}
