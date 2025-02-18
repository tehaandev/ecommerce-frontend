export interface User {
  id: string;
  email: string;
  favorites: string[];
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
}

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (values: RegisterFormValues) => Promise<void>;
}

export interface LoginResponse {
  message: string;
  token: string;
}
