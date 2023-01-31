import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby/Lobby";
import Editor from "./pages/Editor/Editor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />}></Route>
          <Route path="/editor/:codeblockId" element={<Editor />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
