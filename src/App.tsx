import AuthProvider from "./components/auth/AuthProvider";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import AntdProvider from "./components/ui/AntdProvider";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";

export default function App() {
  return (
    <div className="font-satoshi">
      <AntdProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" />
              <Route path="/dashboard" element={<ProtectedRoutes />}>
                <Route index element={<div>Protected</div>} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </AntdProvider>
    </div>
  );
}
