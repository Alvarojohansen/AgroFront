import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import WelcomePage from "./components/welcomePage/WelcomePage";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
