import { FC, useReducer, useEffect, useState } from "react";
import { AuthContext, authReducer } from ".";

import Cookies from "js-cookie";

import { User } from "@prisma/client";

export interface AuthState {
  isLoggedIn: boolean;
  auth: Omit<User, "password" | "createdAt" | "updatedAt"> | null;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  auth: null,
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return setIsLoading(false);
    }
    try {
      const response = await fetch(
        "/api/auth/validate_token",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const userChecked = await response.json();

        const { auth } = userChecked;

        dispatch({
          type: "[Auth] - Login",
          payload: auth,
        });
      }

      setIsLoading(false);
      return response;
    } catch (err) {
      console.log(err, "user not authenticated");
      setIsLoading(false);
      return null;
    }
  };

  const loginUser = async (
    password: string,
    username: string
  ): Promise<boolean> => {
    try {
      let response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, username }),
      });
      if (!response.ok) {
        return false;
      }
      const userLogged = await response.json();
      const { auth } = userLogged;
      dispatch({
        type: "[Auth] - Login",
        payload: auth,
      });
      return true;
    } catch (err) {
      console.log(err, "login not authenticated");
      return false;
    }
  };

  const registerUser = async (
    username: string,
    password: string
  ): Promise<{ hasError: boolean }> => {
    try {
      let response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        return { hasError: true };
      }
      const userRegistered = await response.json();

      const { auth } = userRegistered;
      dispatch({
        type: "[Auth] - Login",
        payload: auth,
      });
      return { hasError: false };
    } catch (err) {
      console.log(err, "register not authenticated");
      return { hasError: true };
    }
  };

  const logoutUser = () => {
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isLoading,

        // Methods
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
function useSession(): { data: any; status: any; } {
  throw new Error("Function not implemented.");
}

