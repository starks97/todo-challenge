import { AuthState } from ".";
import { User } from "@prisma/client";

type AuthActionType =
  | {
      type: "[Auth] - Login";
      payload: Omit<User, "password" | "createdAt" | "updatedAt"> | null;
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
