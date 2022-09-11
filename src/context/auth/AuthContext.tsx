import { createContext } from "react";
import { User } from "@prisma/client";

export interface ContextProps {
  isLoggedIn: boolean;
  auth: Omit<User, "password" | "createdAt" | "updatedAt"> | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  registerUser: (
    username: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  isLoading: boolean;
}

export const AuthContext = createContext({} as ContextProps);
