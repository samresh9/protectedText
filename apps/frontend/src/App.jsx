import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentWrapper from "./components/ComponentWrapper.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ComponentWrapper />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
