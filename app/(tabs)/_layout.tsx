import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import FavoritesIcon from "@/assets/icons/favorites.svg";
import HomeIcon from "@/assets/icons/home.svg";
import ListingsIcon from "@/assets/icons/listings.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          android: {
            backgroundColor: "#0E263E",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <FavoritesIcon width={24} height={24} color={color} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: "Listings",
          tabBarIcon: ({ color }) => (
            <ListingsIcon width={24} height={24} color={color} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={24} height={24} color={color} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
