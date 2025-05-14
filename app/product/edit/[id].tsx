import BackIcon from "@/assets/icons/back.svg";
import Trash from "@/assets/icons/delete.svg";
import { CustomText } from "@/components/ui/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  // add other fields as needed
};

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setTags(data.tags || []);
      });
  }, [id]);

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        tags,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setTags(data.tags || []);
        Alert.alert("Success", "Product updated successfully (simulated)!");
      })
      .catch((err) => {
        Alert.alert("Error", "Failed to update product.");
      });
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center justify-between mt-20 mb-6 px-4">
          <Pressable hitSlop={20} onPress={() => router.back()} className="p-2">
            <BackIcon width={24} height={24} />
          </Pressable>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            Edit product
          </CustomText>
          <View style={{ width: 28 }} />
        </View>
        {/* Edit product section */}
        <View className=" rounded-2xl p-4 mb-6 ">
          <CustomText className="text-2xl font-lexend-medium text-dark-blue mb-6">
            Edit product
          </CustomText>
          <CustomText className="text-base font-lexend-medium mb-2">
            Title<CustomText className="text-error">*</CustomText>
          </CustomText>
          <TextInput
            className="bg-white px-4 h-14 rounded-xl mb-4 font-lexend text-base"
            value={title}
            onChangeText={setTitle}
            style={{ paddingTop: 0, paddingBottom: 0, lineHeight: 20 }}
          />
          <CustomText className="text-base font-lexend-medium mb-2">
            Product description
          </CustomText>
          <TextInput
            className="bg-white px-4 py-3 rounded-xl mb-4 font-lexend text-base"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={{ minHeight: 80, textAlignVertical: "top" }}
          />
          <View className="bg-double-cell rounded-xl px-4 py-4 mb-2">
            <View className="flex-row items-center">
              <CustomText className="text-base font-lexend-semibold text-dark-blue">
                💡 ID of product
              </CustomText>
            </View>
            <CustomText className="ml-2 text-base text-dark-blue">
              82031
            </CustomText>
          </View>
        </View>

        {/* Tags section */}
        <View className=" rounded-2xl p-4 mb-6 ">
          <CustomText className="text-2xl font-lexend-semibold text-dark-blue mb-6">
            Tags
          </CustomText>
          {tags.map((tag, i) => (
            <View key={i} className=" mb-4">
              <CustomText className="text-base text-dark-blue pb-2 font-lexend-medium mr-2 w-28">
                Tag name<CustomText className="text-error">*</CustomText>
              </CustomText>
              <View className="flex-row items-center">
                <TextInput
                  style={{ paddingTop: 0, paddingBottom: 0, lineHeight: 20 }}
                  className="bg-white px-4 h-14 rounded-2xl flex-1 font-lexend text-base"
                  value={tag}
                  onChangeText={(text) => {
                    const newTags = [...tags];
                    newTags[i] = text;
                    setTags(newTags);
                  }}
                  textAlignVertical="center"
                />
                <Pressable onPress={() => handleRemoveTag(i)} className="mx-4">
                  <Trash />
                </Pressable>
              </View>
            </View>
          ))}
          <TextInput
            className="bg-white p-4 h-14 rounded-xl flex-1 font-lexend text-base mb-4"
            value={newTag}
            style={{ paddingTop: 0, paddingBottom: 0, lineHeight: 20 }}
            onChangeText={setNewTag}
            placeholder="New Tag name"
            placeholderTextColor="#A0AEC0"
          />
          <View className="">
            <TouchableOpacity
              onPress={handleAddTag}
              className="active:opacity-50 items-center mb-2 bg-white rounded-2xl py-4 px-8"
            >
              <CustomText className="text-dark-blue font-lexend-medium text-base">
                Add tag +
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation buttons */}
        <View className="flex-row justify-between mt-14 mb-10 mx-4">
          <Pressable className="bg-white w-48 rounded-xl py-3 px-8 items-center">
            <CustomText className="text-dark-blue font-lexend-medium text-base">
              Back
            </CustomText>
          </Pressable>
          <Pressable
            className="bg-background-yellow w-1/2 rounded-xl py-3 px-8 items-center"
            onPress={handleUpdate}
          >
            <CustomText className="text-dark-blue font-lexend-medium text-base">
              Next
            </CustomText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
