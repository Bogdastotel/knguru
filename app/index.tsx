import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function RootIndex() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem("session-token").then(setToken);
  }, []);

  if (token === undefined) return null; // loading

  if (token) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}
