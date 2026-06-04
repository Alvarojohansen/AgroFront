import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router"; // react-router-dom is usually used for web, but sticking to user's import
import WelcomePage from "./components/welcomePage/WelcomePage";
import NavBar from "./components/navBar/NavBar";
import StockManager from "./components/stock/StockManager";
import VentasManager from "./components/ventas/VentasManager";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/stock" element={<StockManager />} />
          <Route path="/ventas" element={<VentasManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
