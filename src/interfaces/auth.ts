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

export interface LoginResponse {
  message: string;
  token: string;
}
