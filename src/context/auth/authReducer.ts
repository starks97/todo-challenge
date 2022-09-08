import { AuthState } from ".";
import { User } from "@prisma/client";

type AuthActionType =
  | {
      type: "[Auth] - Login";
      payload: {
        user: Omit<User, "password" | "createdAt" | "updatedAt">;
        token: string;
      };
    }
  | { type: "[Auth] - Logout" };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        isLoggedIn: true,
        auth: action.payload,
      };

    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };

    default:
      return state;
  }
};
