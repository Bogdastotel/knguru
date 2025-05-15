import { create } from "zustand";

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  (set) => ({
    user: null,
    token: null,
    login: (user, token) => set({ user, token }),
    logout: () => set({ user: null, token: null }),
  })
); 