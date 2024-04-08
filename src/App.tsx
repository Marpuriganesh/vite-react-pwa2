import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite-72x72.svg";
import "./App.css";
// import { generateToken, messaging } from "./notificaions/firebase";
// import { onMessage } from "firebase/messaging";
import {
  browserName,
  deviceType,
  osName,
  osVersion,
} from "react-device-detect";
import {motion} from 'framer-motion'

function App() {
  const [count, setCount] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log(
      `broser name: ${browserName}, device type: ${deviceType}, os name: ${osName}, os version: ${osVersion}`
    );
    checkNotificationPermission();
  }, []);
  function checkNotificationPermission() {
    // Check if the browser supports the Notification API
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }

    // Check the current permission status
    const permission = Notification.permission;
    if (permission === "granted") {
      console.log("Notifications permission granted");
    } else if (permission === "denied") {
      console.log("Notifications permission denied");
    } else if (permission === "default") {
      console.log("Notifications permission has not been set yet");
      if (dialogRef.current) {
        dialogRef.current.showModal();
        dialogRef.current.style.display = "flex";
      }
    }
  }

  function handleDialogClose() {
    if (dialogRef.current) {
      dialogRef.current.close();
      // Remove any additional CSS styling here
      dialogRef.current.style.display = "none"; // Example: Hides the dialog
    }
  }

  function handleSubcribe() {
    Notification.requestPermission().then(() => {
      handleDialogClose();
      navigator.serviceWorker.ready.then((registration) => {
        const sw = registration?.active;
        if (sw) {
          sw.postMessage({
            device_id:deviceType+'_'+osName,
            type:"push_token"
          })
        }
       })

      // navigator.serviceWorker.ready.then((registration) => {
      //   console.log(
      //     "Registration successful, scope is:",
      //     registration.scope
      //   );
      //   console.log(registration.active);
      //   if (permission === "granted") {
      //     generateToken(deviceType, registration);
      //     onMessage(messaging, (payload) => {
      //       console.log(payload);
      //     });
      //   }
      // });
    });
  }



  return (
    <>
      <motion.dialog className="dialog" ref={dialogRef} style={{ display: "none" }}

      initial={{ scale: 0 }}
      animate={{ scale: 1 }}

      >
        <img
          src="/vite-192x192.png"
          className="logo"
          alt="Vite logo"
          typeof="image/png"
        />
        <p>Subscribe to get notifications</p>
        <div>
          <button id="notification" onClick={handleSubcribe}>
            subcribe
          </button>
          <button onClick={handleDialogClose}>close</button>
        </div>
      </motion.dialog>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((prev) => prev + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
