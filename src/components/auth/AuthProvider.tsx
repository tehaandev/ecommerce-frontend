import { AuthContext } from "../../contexts/AuthContext";
import {
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
} from "../../interfaces/auth";
import { API, getHTTPErrorMessage } from "../../lib/api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const login = async (email: string, password: string) => {
    try {
      const { data } = (await API.post("/auth/login", { email, password })) as {
        data: LoginResponse;
      };
      localStorage.setItem("token", data.token);
      setToken(data.token);
      const redirect = searchParams.get("redirect");
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = getHTTPErrorMessage(error, "Login failed");
      console.error(error);
      toast.error(errorMsg);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const register = async (values: RegisterFormValues) => {
    try {
      const { data } = (await API.post("/auth/register", values)) as {
        data: RegisterResponse;
      };
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      const errorMsg = getHTTPErrorMessage(error, "Registration failed");
      console.error(error);
      toast.error(errorMsg);
    }
  };

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
