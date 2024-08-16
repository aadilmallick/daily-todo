import { useEffect } from "react";

function usePopupClose(onClose: () => void) {
  useEffect(() => {
    // Open a connection to the background script
    const port = chrome.runtime.connect({ name: "popup" });

    // Listen for the onDisconnect event
    port.onDisconnect.addListener(() => {
      if (onClose && typeof onClose === "function") {
        onClose();
      }
    });

    return () => {
      // Clean up the connection when the component unmounts
      port.disconnect();
    };
  }, []);
}

export default usePopupClose;
