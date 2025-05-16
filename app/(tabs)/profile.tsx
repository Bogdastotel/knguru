import { CustomText } from "@/components/ui/CustomText";
import { useAuthStore } from "@/lib/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      AsyncStorage.getItem("session-user").then((userStr) => {
        if (userStr) {
          const userObj = JSON.parse(userStr);
          login(userObj, userObj.accessToken);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("session-token");
    await AsyncStorage.removeItem("session-user");
    logout();
    router.replace("/auth/login");
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: handleLogout },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <CustomText className="text-lg text-dark-blue mb-6">
          Loading...
        </CustomText>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <CustomText className="text-lg text-dark-blue mb-6">
          Not logged in
        </CustomText>
        <Pressable
          className="bg-[#FFD500] rounded-xl py-4 px-8 items-center active:opacity-80"
          onPress={() => router.replace("/auth/login")}
        >
          <CustomText className="text-dark-blue text-lg font-lexend-bold">
            Go to Login
          </CustomText>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Image
        source={{ uri: user?.image }}
        style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 24 }}
      />
      <CustomText className="text-2xl font-lexend-bold text-dark-blue mb-2">
        {user?.firstName} {user?.lastName}
      </CustomText>
      <CustomText className="text-base text-secondary mb-6">
        {user?.email}
      </CustomText>
      <Pressable
        className="bg-[#FFD500] rounded-xl py-4 px-8 items-center active:opacity-80"
        onPress={confirmLogout}
      >
        <CustomText className="text-dark-blue text-lg font-lexend-bold">
          Logout
        </CustomText>
      </Pressable>
    </View>
  );
}
