import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
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
