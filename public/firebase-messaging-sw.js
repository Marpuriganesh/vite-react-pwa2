
/* eslint-env serviceworker */

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

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
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/vite-192x192.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });