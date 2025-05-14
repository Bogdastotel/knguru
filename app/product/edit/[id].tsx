import BackIcon from "@/assets/icons/back.svg";
import Trash from "@/assets/icons/delete.svg";
import { CustomText } from "@/components/ui/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("Product title");
  const [description, setDescription] = useState(
    "We're looking for a skilled team to build a small commercial office (approx. 200 m²) in downtown LA. The job includes lorem ipsum text goes here."
  );
  const [tags, setTags] = useState(["Beauty", "Mascara", "Tag"]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
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
          <Pressable className="bg-background-yellow w-1/2 rounded-xl py-3 px-8 items-center">
            <CustomText className="text-dark-blue font-lexend-medium text-base">
              Next
            </CustomText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
