export function userProfileReducer(
  state: UserProfile,
  action: UserProfileAction,
): UserProfile {
  switch (action.type) {
    case "set_profile":
      return {
        ...state,
        ...action.payload,
      };

    case "update_avatar":
      return {
        ...state,
        avatarUrl: action.payload,
      };

    case "set_loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "set_loaded":
      return {
        ...action.payload,
        isLoading: false,
        isLoaded: true,
        isSigningOut: false,
        error: null,
      };

    case "set_error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "set_signing_out":
      return {
        ...state,
        isSigningOut: true,
      };

    case "clear_profile":
      return initialUserProfile;

    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}

export interface UserProfile {
  id: string | null;
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
  isLoading: boolean;
  isLoaded: boolean;
  isSigningOut: boolean;
  error: string | null;
}

export type UserProfileAction =
  | { type: "set_profile"; payload: UserProfile }
  | { type: "update_avatar"; payload: string }
  | { type: "set_loading" }
  | { type: "set_loaded"; payload: Omit<UserProfile, "isLoading" | "isLoaded" | "error" | "isSigningOut"> }
  | { type: "set_error"; payload: string }
  | { type: "set_signing_out" }
  | { type: "clear_profile" };

export const initialUserProfile: UserProfile = {
  id: null,
  fullName: null,
  email: null,
  avatarUrl: null,
  isLoading: false,
  isLoaded: false,
  isSigningOut: false,
  error: null,
};
