import { AuthContextType } from "../interfaces/auth";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
