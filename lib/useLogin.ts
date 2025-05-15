import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./authStore";

type LoginInput = { username: string; password: string };

export function useLogin() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: async ({ username, password }: LoginInput) => {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
    onSuccess: async (data) => {
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      await AsyncStorage.setItem("session-token", data.accessToken);
      await AsyncStorage.setItem("session-user", JSON.stringify(user));
      login(user, data.accessToken);
    },
  });
} 