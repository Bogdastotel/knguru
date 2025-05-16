import Search from "@/assets/icons/search.svg";
import React, { useCallback } from "react";
import { TextInput, View } from "react-native";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export const SearchInput = React.memo(
  ({ value, onChangeText }: SearchInputProps) => {
    const handleChange = useCallback(
      (text: string) => {
        onChangeText(text);
      },
      [onChangeText]
    );

    return (
      <View className="bg-white rounded-2xl flex-row items-center px-4 mx-4 py-2.5 mb-10">
        <View className="mr-3">
          <Search />
        </View>
        <TextInput
          className="flex-1 text-base font-lexend pt-2 pb-2.5"
          placeholder="Search for products"
          placeholderTextColor="#566A7C"
          textAlignVertical="center"
          value={value}
          onChangeText={handleChange}
        />
      </View>
    );
  }
);
