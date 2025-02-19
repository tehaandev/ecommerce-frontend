import {
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
} from "../interfaces/auth";
import { API, getHTTPErrorMessage } from "../lib/api";
import { setCredentials, logoutAction } from "../slices/authSlice";
import { AppDispatch } from "../store/authStore";
import toast from "react-hot-toast";

export const authService = {
  login: async (email: string, password: string, dispatch: AppDispatch) => {
    try {
      const { data } = (await API.post("/auth/login", { email, password })) as {
        data: LoginResponse;
      };
      dispatch(setCredentials(data.token));
      return data;
    } catch (error) {
      const errorMsg = getHTTPErrorMessage(error, "Login failed");
      toast.error(errorMsg);
      throw error;
    }
  },

  register: async (values: RegisterFormValues, dispatch: AppDispatch) => {
    try {
      const { data } = (await API.post("/auth/register", values)) as {
        data: RegisterResponse;
      };
      dispatch(setCredentials(data.token));
      return data;
    } catch (error) {
      const errorMsg = getHTTPErrorMessage(error, "Registration failed");
      toast.error(errorMsg);
      throw error;
    }
  },

  logout: (dispatch: AppDispatch) => {
    dispatch(logoutAction());
  },
};
