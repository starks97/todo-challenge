import { createContext } from "react";
import { User } from "@prisma/client";

export interface ContextProps {
  isLoggedIn: boolean;
  auth: {
    user: Omit<User, "password" | "createdAt" | "updatedAt">;
    token: string;
  } | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  registerUser: (
    username: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const AuthContext = createContext({} as ContextProps);
