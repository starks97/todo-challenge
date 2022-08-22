import { AuthState } from "./";
import { User } from "@prisma/client";

type AuthActionType =
  | { type: "[Auth] - Login"; payload: User }
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
        Context_user: action.payload,
      };

    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        Context_user: undefined,
      };

    default:
      return state;
  }
};
