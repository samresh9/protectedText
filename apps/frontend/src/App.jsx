import { useState } from "react";
import index from "encrypt-handler";
import reactLogo from "./assets/react.svg";
import "./App.css";

const { encryptData } = index;
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <p>{encryptData("samresh", "samresh")}</p>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer"></a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
