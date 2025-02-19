import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import AntdProvider from "./components/ui/AntdProvider";
import AddProductPage from "./pages/AddProductPage";
import DashboardPage from "./pages/DashboardPage";
import EditProductPage from "./pages/EditProductPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import ViewProductPage from "./pages/ViewProductPage";
import { authStore } from "./store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <AntdProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={authStore}>
            <Toaster />
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" />
              <Route path="/" element={<ProtectedRoutes />}>
                <Route index element={<DashboardPage />} />
                <Route path="add-product" element={<AddProductPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="view-product/:id" element={<ViewProductPage />} />
                <Route path="edit-product/:id" element={<EditProductPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
            </Routes>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </AntdProvider>
  );
}
