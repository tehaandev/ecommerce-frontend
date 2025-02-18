import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoutes() {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();
  if (!isAuthenticated || !token) {
    localStorage.removeItem("token");
    return (
      <Navigate
        to={`/login?redirect=${location.pathname}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
