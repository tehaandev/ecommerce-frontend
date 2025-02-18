import AuthProvider from "./components/auth/AuthProvider";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import AntdProvider from "./components/ui/AntdProvider";
import MainLayout from "./components/ui/MainLayout";
import AddProductPage from "./pages/AddProductPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
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
                <Route path="login" element={<LoginPage />} />
                <Route path="register" />
                <Route path="/" element={<ProtectedRoutes />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="add-product" element={<AddProductPage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </AntdProvider>
    </MainLayout>
  );
}
