import Back from "@/assets/icons/back.svg";
import Check from "@/assets/icons/check.svg";
import Trash from "@/assets/icons/delete.svg";
import { CustomText } from "@/components/ui/CustomText";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
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
};

const fetchProduct = async (id: string | string[] | undefined) => {
  if (!id) throw new Error("No product id");
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const updateProduct = async ({
  id,
  data,
}: {
  id: string | string[] | undefined;
  data: Partial<Product>;
}) => {
  if (!id) throw new Error("No product id");
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showModal, setShowModal] = useState(false);
  const checkAnim = useRef(new Animated.Value(0)).current;

  // Track original values
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [originalTags, setOriginalTags] = useState<string[]>([]);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  // Prefill form fields when product is loaded
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setTags(product.tags || []);
      // Store original values
      setOriginalTitle(product.title || "");
      setOriginalDescription(product.description || "");
      setOriginalTags(product.tags || []);
    }
  }, [product]);

  // Check if any changes were made
  const hasChanges = useMemo(() => {
    if (!product) return false;

    const titleChanged = title !== originalTitle;
    const descriptionChanged = description !== originalDescription;
    const tagsChanged = JSON.stringify(tags) !== JSON.stringify(originalTags);

    return titleChanged || descriptionChanged || tagsChanged;
  }, [
    title,
    description,
    tags,
    originalTitle,
    originalDescription,
    originalTags,
    product,
  ]);

  useEffect(() => {
    if (showModal) {
      checkAnim.setValue(0);
      Animated.spring(checkAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 80,
      }).start();
    }
  }, [showModal]);

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const { mutate: updateProductMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      // Update the cache with new data
      queryClient.setQueryData(["product", id], data);
      setShowModal(true);
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to update product.");
    },
  });

  const handleUpdate = () => {
    updateProductMutation({
      id,
      data: {
        title,
        description,
        tags,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View className="flex-row items-center justify-between mt-20 mb-6 px-4">
          <Pressable hitSlop={20} onPress={() => router.back()} className="p-2">
            <Back width={24} height={24} />
          </Pressable>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            Edit product
          </CustomText>
          <Pressable
            hitSlop={20}
            onPress={handleUpdate}
            disabled={!hasChanges || isUpdating}
            className={`p-2 ${!hasChanges || isUpdating ? "opacity-50" : ""}`}
          >
            <CustomText className="text-dark-blue font-lexend-medium text-base">
              {isUpdating ? "Saving..." : "Save"}
            </CustomText>
          </Pressable>
        </View>

        {/* Edit product section */}
        <View className="rounded-2xl p-4 mb-6">
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
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
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
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
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
        <View className="rounded-2xl p-4 mb-6">
          <CustomText className="text-2xl font-lexend-semibold text-dark-blue mb-6">
            Tags
          </CustomText>
          {tags.map((tag, i) => (
            <View key={i} className="mb-4">
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
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
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
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
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
          <Pressable
            className="bg-white w-48 rounded-xl py-3 px-8 items-center"
            onPress={() => router.back()}
          >
            <CustomText className="text-dark-blue font-lexend-medium text-base">
              Back
            </CustomText>
          </Pressable>
          <Pressable
            className={`${
              hasChanges ? "bg-background-yellow" : "bg-stroke-primary"
            } w-1/2 rounded-xl py-3 px-8 items-center`}
            onPress={handleUpdate}
            disabled={!hasChanges || isUpdating}
          >
            <CustomText className="text-dark-blue font-lexend-medium text-base">
              {isUpdating ? "Saving..." : "Save"}
            </CustomText>
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 bg-dark-blue justify-center items-center">
          <View className="items-center mt-20">
            <Animated.View
              style={{
                transform: [{ scale: checkAnim }],
                opacity: checkAnim,
                marginBottom: 24,
              }}
            >
              <Check width={64} height={64} />
            </Animated.View>
            <CustomText className="text-white text-4xl font-lexend-bold mb-2 text-center">
              Product updated!
            </CustomText>
            <CustomText className="text-white text-base mb-8 text-center">
              Successfully updated the product!
            </CustomText>
            <Pressable
              className="bg-[#FFD500] rounded-xl px-8 py-3 w-64"
              onPress={() => {
                setShowModal(false);
                router.replace("/");
              }}
            >
              <CustomText className="text-dark-blue text-center text-lg font-lexend-bold">
                Back to home
              </CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
