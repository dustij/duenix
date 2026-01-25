import { createContext, Dispatch } from "react";
import { UserProfile, UserProfileAction } from "./user_profile.reducer";

export const UserProfileContext = createContext<UserProfile | null>(null);
export const UserProfileDispatchContext =
  createContext<Dispatch<UserProfileAction> | null>(null);
