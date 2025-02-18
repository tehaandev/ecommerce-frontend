import { AuthContext } from "../contexts/AuthContext";
import {
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
  User,
} from "../interfaces/auth";
import { API, getHTTPErrorMessage } from "../lib/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await API.get("/auth/check");
      setUser(data);
    } catch (error) {
      setUser(null);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = (await API.post("/auth/login", { email, password })) as {
        data: LoginResponse;
      };
      localStorage.setItem("token", data.token);
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
      setUser(null);
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
      navigate("/dashboard");
    } catch (error) {
      const errorMsg = getHTTPErrorMessage(error, "Registration failed");
      console.error(error);
      toast.error(errorMsg);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
