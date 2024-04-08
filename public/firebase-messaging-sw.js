/* eslint-env serviceworker */

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");

importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyBIkkWmQeMwFvwa6RxFqX0ILj0oG4urQO8",
  authDomain: "reach-out-webtest.firebaseapp.com",
  databaseURL: "https://reach-out-webtest-default-rtdb.firebaseio.com",
  projectId: "reach-out-webtest",
  storageBucket: "reach-out-webtest.appspot.com",
  messagingSenderId: "782947817091",
  appId: "1:782947817091:web:84d05867099fc579b7adb6",
  measurementId: "G-3VGK4ZTKF5",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/vite-192x192.png",
    actions: JSON.parse(payload.data.actions),
    data: JSON.parse(payload.data._data),
    badge: "/vite-32x32.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const action = event.action;
  switch (action) {
    case "open_url":
      // eslint-disable-next-line no-case-declarations
      const url = event.notification.data.url;
      if (url) {
        clients.openWindow(url);
      } else {
        console.error("URL not found in the notification data");
        console.log(event.notification.data);
      }
      console.log(event);
      break;
    default:
      // Handle other actions
      console.log("Unknown action:", action);
  }
});


function generateUniqueDeviceId() {
  // Generate a random number
  const randomNumber = Math.floor(Math.random() * 1000000);
  // Get the current timestamp
  const timestamp = new Date().getTime();
  // Combine the random number and timestamp to create a unique ID
  return `_${timestamp}_${randomNumber}`;
}


self.addEventListener("message", (event) => {
  const { data } = event;
  const temp = generateUniqueDeviceId();
  if (data.type === "show_notification") {
    self.registration.showNotification("count", {
      body:data.value,
      icon: "/vite-192x192.png",
    })
  }
  messaging
    .getToken({
      vapidKey:
        "BErrvVg-igurWkB-5TgQ1OM_sdTPBiXJfzFQNK7-DQiRbFrU1YivmxgDtyT5Gaglztti07Q12hBQzAuibuUllmw",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);

        if (data.type === "push_token") {
          fetch("https://socketio-reach-out.koyeb.app/store-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              device_id: data.device_id+temp,
              token: currentToken,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    });
});
