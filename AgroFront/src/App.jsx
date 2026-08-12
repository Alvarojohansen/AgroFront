import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router"; // react-router-dom is usually used for web, but sticking to user's import
import { AuthProvider } from "./context/AuthContext";
import WelcomePage from "./components/welcomePage/WelcomePage";
import NavBar from "./components/navBar/NavBar";
import StockManager from "./components/stock/StockManager";
import VentasManager from "./components/ventas/VentasManager";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProximamentePage from "./components/reportes/ProximamentePage";
import ClientesManager from "./components/clientes/ClientesManager";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/stock" 
              element={
                <ProtectedRoute>
                  <StockManager />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ventas" 
              element={
                <ProtectedRoute>
                  <VentasManager />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reportes" 
              element={
                <ProtectedRoute>
                  <ProximamentePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clientes" 
              element={
                <ProtectedRoute>
                  <ClientesManager />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
