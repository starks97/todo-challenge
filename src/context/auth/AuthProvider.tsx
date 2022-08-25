import { FC, useReducer, useEffect } from "react";
import { AuthContext, authReducer } from ".";
import { User } from "@prisma/client";

export interface AuthState {
  isLoggedIn: boolean;
  auth?: {
    user: Omit<User, "password" | "createdAt" | "updatedAt">;
    token: string;
  };
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  auth: undefined,
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const response = await fetch("/api/auth/validate_token", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const user = await response.json();
        dispatch({
          type: "[Auth] - Login",
          payload: { user: user.user, token: user.token },
        });
      }
      return response;
    } catch (err) {
      console.log(err, "user not authenticated");
    }
  };

  const loginUser = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      let response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        return false;
      }
      const userLogged = await response.json();
      dispatch({
        type: "[Auth] - Login",
        payload: { user: userLogged.user, token: userLogged.token },
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
      const user = await response.json();
      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });
      return { hasError: false };
    } catch (err) {
      console.log(err, "register not authenticated");
      return { hasError: true };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
