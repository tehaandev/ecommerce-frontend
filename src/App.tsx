import "./App.css";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="login" />
          <Route path="register" />
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route index element={<div>Protected</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
