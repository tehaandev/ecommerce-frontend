import { RegisterFormValues } from "../interfaces/auth";
import { authService } from "../services/authService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    await authService.login(email, password, dispatch);
    navigate("/");
  };

  const register = async (values: RegisterFormValues) => {
    await authService.register(values, dispatch);
    navigate("/");
  };

  const logout = () => {
    authService.logout(dispatch);
    navigate("/login");
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
    register,
  };
};
