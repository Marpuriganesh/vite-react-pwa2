import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";



// Generate a pseudo-unique device ID
function generateDeviceId() {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 1000000);
    // Get the current timestamp
    const timestamp = new Date().getTime();
    // Combine the random number and timestamp to create a unique ID
    return `device_${timestamp}_${randomNumber}`;
}




const firebaseConfig = {
  apiKey: "AIzaSyBIkkWmQeMwFvwa6RxFqX0ILj0oG4urQO8",
  authDomain: "reach-out-webtest.firebaseapp.com",
  databaseURL: "https://reach-out-webtest-default-rtdb.firebaseio.com",
  projectId: "reach-out-webtest",
  storageBucket: "reach-out-webtest.appspot.com",
  messagingSenderId: "782947817091",
  appId: "1:782947817091:web:84d05867099fc579b7adb6",
  measurementId: "G-3VGK4ZTKF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async (deviceType:string,registration: ServiceWorkerRegistration) => {
    // Usage example
    const deviceId = generateDeviceId();
    const device = deviceType+deviceId;
    const token = await getToken(messaging,{
        serviceWorkerRegistration:registration,
        vapidKey:"BErrvVg-igurWkB-5TgQ1OM_sdTPBiXJfzFQNK7-DQiRbFrU1YivmxgDtyT5Gaglztti07Q12hBQzAuibuUllmw"
    });
    console.log(token);
    // Make fetch request to FastAPI endpoint
    fetch('https://socketio-reach-out.koyeb.app/store-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device_id:device,token:token }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}