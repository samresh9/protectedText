import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import index  from 'encrypt-handler';
const { encryptData, decryptData, hashData } = index;
// import { encryptData, decryptData, hashData } from 'encrypt-handler';

  console.log(encryptData);
    console.log(decryptData);
function App() {
  const [count, setCount] = useState(0)

const encryptedData= encryptData("samresh","samresh" );
const decryptedData = decryptData(
  "U2FsdGVkX1+8j6OBkcJmRUFN4uWY+XHnVbWvMaAX1LU=",
  "samresh"
);
  return (
    <>
      <div>
        <h2>{encryptedData}</h2>
        <h2>{decryptedData}</h2>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
