import Eye from "@/assets/icons/eye.svg";
import GoogleLogo from "@/assets/icons/google.svg";
import Letter from "@/assets/icons/letter.svg";
import Lock from "@/assets/icons/lock.svg";
import { CustomText } from "@/components/ui/CustomText";
import { useLogin } from "@/lib/useLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  User,
} from "firebase/auth";
import * as React from "react";
import { useState } from "react";
import { Alert, Pressable, TextInput, View } from "react-native";
import "react-native-gesture-handler";
import { auth } from "../../firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "620102760932-905tivopfp46bgjobn3prl5kifgv55qf.apps.googleusercontent.com",
    androidClientId:
      "620102760932-9jmqfliqbs5bjli6d6272j9crt6bdsg0.apps.googleusercontent.com",
  });

  console.log("userInfo", userInfo);

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("user not authenticated");
      }
    });
    return () => unsub();
  }, []);

  const handleLogin = () => {
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          router.replace("/(tabs)");
        },
        onError: (error: any) => {
          Alert.alert("Login failed", error?.message || "Unknown error");
        },
      }
    );
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();

      // Store the access token
      await AsyncStorage.setItem("session-token", accessToken);

      // Create a Google credential with the token
      const credential = GoogleAuthProvider.credential(accessToken);

      // Sign in to Firebase
      const userCredential = await signInWithCredential(auth, credential);
      setUserInfo(userCredential.user);

      // Store the user data
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));

      router.replace("/(tabs)");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#D9E3ED] px-6 pt-16">
      {/* Title */}
      <CustomText className="text-2xl font-lexend-semibold text-dark-blue mb-6 mt-24">
        Login
      </CustomText>
      {/* Username */}
      <CustomText className="text-base font-lexend-medium text-dark-blue mb-2">
        Email
      </CustomText>
      <View className="flex-row items-center bg-white rounded-xl px-4 mb-4">
        <Letter width={24} height={24} />
        <TextInput
          className="flex-1 ml-3 h-14 text-base font-lexend text-dark-blue"
          placeholder="email@example.com"
          placeholderTextColor="#566A7C"
          value={username}
          onChangeText={setUsername}
          style={{ lineHeight: 20 }}
          autoCapitalize="none"
        />
      </View>
      {/* Password */}
      <CustomText className="text-base font-lexend-medium text-dark-blue mb-2">
        Password
      </CustomText>
      <View className="flex-row items-center bg-white rounded-xl px-4  mb-6">
        <Lock width={22} height={22} />
        <TextInput
          className="flex-1 ml-3 h-14 text-base font-lexend text-dark-blue"
          placeholder="********"
          placeholderTextColor="#566A7C"
          value={password}
          style={{ lineHeight: 20 }}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword((v) => !v)}>
          <Eye width={22} height={22} />
        </Pressable>
      </View>
      {/* Login Button */}
      <Pressable
        className="bg-background-yellow rounded-xl py-4 items-center mb-4 active:opacity-80"
        onPress={handleLogin}
        disabled={loginMutation.status === "pending"}
      >
        <CustomText className="text-dark-blue text-base font-lexend-medium">
          {loginMutation.status === "pending" ? "Logging in..." : "Login"}
        </CustomText>
      </Pressable>
      {/* Google Button */}
      <Pressable
        onPress={handleGoogleSignIn}
        disabled={isLoading}
        className="bg-white rounded-xl py-4 flex-row items-center justify-center active:opacity-80"
      >
        <GoogleLogo width={24} height={24} />
        <CustomText className="ml-2 text-[14px] font-lexend-medium text-dark-blue">
          {isLoading ? "Signing in..." : "Continue with Google"}
        </CustomText>
      </Pressable>
    </View>
  );
}
