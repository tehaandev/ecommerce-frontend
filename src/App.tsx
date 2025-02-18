import AuthProvider from "./components/auth/AuthProvider";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import AntdProvider from "./components/ui/AntdProvider";
import MainLayout from "./components/ui/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <MainLayout>
      <AntdProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Toaster />
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" />
                <Route path="/dashboard" element={<ProtectedRoutes />}>
                  <Route index element={<DashboardPage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </AntdProvider>
    </MainLayout>
  );
}
