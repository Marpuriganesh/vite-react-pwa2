import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite-72x72.svg'
import './App.css'
import { generateToken,messaging } from './notificaions/firebase'
import { onMessage } from 'firebase/messaging'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const deviceType = getDeviceType(userAgent);
    generateToken(deviceType)
    onMessage(messaging,(payload) => {
      console.log(payload)
    })
  },[])

      // Function to determine the device type from userAgent
      const getDeviceType = (userAgent: string) => {
        // Check for Android
        if (/Android/i.test(userAgent)) {
            return 'Android';
        }
        // Check for iPhone
        if (/iPhone/i.test(userAgent)) {
            return 'iPhone';
        }
        // Check for iPad
        if (/iPad/i.test(userAgent)) {
            return 'iPad';
        }
        // Check for iPod
        if (/iPod/i.test(userAgent)) {
            return 'iPod';
        }
        // Check for BlackBerry
        if (/BlackBerry/i.test(userAgent)) {
            return 'BlackBerry';
        }
        // Check for Windows Phone
        if (/IEMobile/i.test(userAgent)) {
            return 'Windows Phone';
        }
        // Check for Opera Mini
        if (/Opera Mini/i.test(userAgent)) {
            return 'Opera Mini';
        }
        // Default to Desktop if none of the above
        return 'Desktop';
    };

  return (
    <>
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
        <button onClick={() => setCount((count) => count + 1)}>
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
  )
}

export default App
