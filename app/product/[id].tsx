import Back from "@/assets/icons/back.svg";
import ShieldCheck from "@/assets/icons/badge.svg";
import Deposit from "@/assets/icons/deposit.svg";
import Heart from "@/assets/icons/heart.svg";
import HelperIcon from "@/assets/icons/helper.svg";
import Star from "@/assets/icons/star.svg";
import WorkerIcon from "@/assets/icons/worker.svg";
import { CustomText } from "@/components/ui/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Dummy data for demonstration
  const product = {
    title: "Product title",
    createdAt: "Jan 23, 2025",
    description:
      "We're looking for a skilled team to build a small commercial office (approx. 200 m²) in downtown L.A. The job includes...",
    category: "Category name",
    workers: [
      { label: "2 professionals", rate: "36,00 €/h" },
      { label: "1 helper", rate: "20,00 €/h" },
    ],
    price: "$9.99",
    discount: "9.718",
    rating: "4.94",
    stock: "5",
    tags: ["Beauty", "Mascara", "Tag"],
    weight: "2",
    warranty: "1 month warranty",
  };

  function chunkArray(array: string[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const tagRows = chunkArray(product.tags, 2);

  return (
    <ScrollView
      className="flex-1 bg-background px-4"
      contentContainerStyle={{ paddingBottom: 64 }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mt-20 mb-2">
        <Pressable hitSlop={20} onPress={() => router.back()}>
          <Back />
        </Pressable>
        <CustomText className="text-base text-dark-blue font-lexend-medium">
          Project
        </CustomText>
        <Pressable onPress={() => {}}>
          <Heart color="#566A7C" />
        </Pressable>
      </View>
      <CustomText className="text-body font-lexend-semibold text-secondary mb-1 mt-6">
        Created at {product.createdAt}
      </CustomText>
      <CustomText
        className="font-lexend-semibold text-product-title-lg mb-2 mt-1"
        style={{ color: "#22223B" }}
      >
        {product.title}
      </CustomText>
      <CustomText className="text-base text-secondary mb-2">
        {product.description}{" "}
        <CustomText className="text-primary-blue font-lexend-semibold">
          Read more
        </CustomText>
      </CustomText>
      {/* Status cards */}
      <View className="flex-row mt-6 mb-4">
        <View className="flex-1 bg-white rounded-2xl p-3 mr-2">
          <ShieldCheck />
          <CustomText className="font-lexend-medium text-base mt-2 mb-1">
            Credit worthy
          </CustomText>
          <CustomText className="text-sm text-secondary">
            Status for provider
          </CustomText>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-3 ml-2">
          <Deposit />
          <CustomText className="font-lexend-medium text-base mt-2 mb-1">
            Deposit paid
          </CustomText>
          <CustomText className="text-sm text-secondary">Deposit</CustomText>
        </View>
      </View>
      <CustomText className="text-xl font-lexend-semibold text-dark-blue mb-4 mt-8">
        Details
      </CustomText>
      <View className="bg-white rounded-2xl mb-4">
        <View className="flex-row rounded-t-2xl bg-stroke-secondary px-4 pb-3 justify-between mb-4 pt-3">
          <CustomText className="text-base font-lexend-semibold text-dark-blue">
            Category
          </CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.category}
          </CustomText>
        </View>
        {/* Worker rows */}
        <View className="space-y-3 ">
          <View className="flex-row  px-4 border-b border-stroke-primary items-center justify-between">
            <View className="flex-row items-center  pb-4">
              <View className="bg-stroke-primary p-2 rounded-full mr-2">
                <WorkerIcon width={20} height={20} />
              </View>
              <View>
                <CustomText className="text-md text-secondary">
                  Workers needed
                </CustomText>
                <CustomText className="text-base font-lexend text-dark-blue">
                  2 professionals
                </CustomText>
              </View>
            </View>
            <View className="items-end">
              <CustomText className="text-xs text-secondary">
                Hourly rate
              </CustomText>
              <CustomText className="text-base font-lexend text-dark-blue">
                36,00 €/h
              </CustomText>
            </View>
          </View>
          <View className="flex-row items-center border-b border-stroke-primary py-4 justify-between px-4">
            <View className="flex-row items-center">
              <View className="bg-stroke-primary p-2 rounded-full mr-2">
                <HelperIcon width={20} height={20} />
              </View>
              <View>
                <CustomText className="text-md text-secondary">
                  Workers needed
                </CustomText>
                <CustomText className="text-base text-dark-blue">
                  1 helper
                </CustomText>
              </View>
            </View>
            <View className="items-end">
              <CustomText className="text-xs text-secondary">
                Hourly rate
              </CustomText>
              <CustomText className="text-base text-dark-blue">
                20,00 €/h
              </CustomText>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-2xl mb-4">
        <View className="flex-row justify-between border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary">Price</CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.price}
          </CustomText>
        </View>
        <View className="flex-row justify-between  border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary">Discount</CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.discount}
          </CustomText>
        </View>
        <View className="flex-row justify-between border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary">Rating</CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.rating}
          </CustomText>
        </View>
        <View className="flex-row justify-between border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary">Stock</CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.stock}
          </CustomText>
        </View>
        <View className="flex justify-between border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary mr-2">
            Tags
          </CustomText>
          {tagRows.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row mt-3">
              {row.map((tag, i) => (
                <View
                  key={i}
                  className={`bg-background-price w-48p rounded-lg px-2 py-2${
                    i === 0 ? " mr-3" : ""
                  } mt-0.5`}
                >
                  <CustomText className="text-md font-lexend text-dark-blue">
                    {tag}
                  </CustomText>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View className="flex-row justify-between border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary">Weight</CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.weight}
          </CustomText>
        </View>
        <View className="flex-row justify-between border-b border-stroke-primary py-6.5 px-4">
          <CustomText className="text-base text-secondary">Warranty</CustomText>
          <CustomText className="text-base font-lexend-medium text-dark-blue">
            {product.warranty}
          </CustomText>
        </View>
      </View>

      <View className="bg-white mb-4 rounded-2xl">
        <View className="flex-row rounded-t-2xl bg-stroke-secondary px-4 pb-3 justify-between pt-3">
          <CustomText className="text-base font-lexend-semibold text-dark-blue">
            John Doe
          </CustomText>
        </View>
        <View className="bg-white mb-4 rounded-b-2xl">
          <View className="flex-row border-b border-stroke-primary py-4 px-4 items-center">
            <Star />
            <View className="ml-3">
              <CustomText className="text-2xl font-lexend-medium text-dark-blue">
                {4.92}
              </CustomText>
              <CustomText className="text-sm text-secondary">Rating</CustomText>
            </View>
            <View className=" bg-stroke-primary h-px mx-4 my-4"></View>
          </View>
          <View className="flex justify-between py-4 px-4">
            <CustomText className="text-sm text-secondary">Comment</CustomText>
            <CustomText className="text-sm text-dark-blue">
              Very happy with my purchase!
            </CustomText>
          </View>
        </View>
      </View>
      <View className="bg-white mb-4 rounded-2xl">
        <View className="flex-row rounded-t-2xl bg-stroke-secondary px-4 pb-3 justify-between pt-3">
          <CustomText className="text-base font-lexend-semibold text-dark-blue">
            John Doe
          </CustomText>
        </View>
        <View className="bg-white mb-4 rounded-b-2xl">
          <View className="flex-row border-b border-stroke-primary py-4 px-4 items-center">
            <Star />
            <View className="ml-3">
              <CustomText className="text-2xl font-lexend-medium text-dark-blue">
                {4.92}
              </CustomText>
              <CustomText className="text-sm text-secondary">Rating</CustomText>
            </View>
            <View className=" bg-stroke-primary h-px mx-4 my-4"></View>
          </View>
          <View className="flex justify-between py-4 px-4">
            <CustomText className="text-sm text-secondary">Comment</CustomText>
            <CustomText className="text-sm text-dark-blue">
              Habitant aliquam sed odio diam amet. Lorem vestibulum leo amet
              pellentesque eget sed. Ultrices viverra donec nulla magna
              maecenas. Odio non est cras urna eleifend velit ut ut in. Aenean
              faucibus.
            </CustomText>
          </View>
        </View>
      </View>
      <View className="bg-white mb-4 rounded-2xl">
        <View className="flex-row rounded-t-2xl bg-stroke-secondary px-4 pb-3 justify-between pt-3">
          <CustomText className="text-base font-lexend-semibold text-dark-blue">
            John Doe
          </CustomText>
        </View>
        <View className="bg-white mb-4 rounded-b-2xl">
          <View className="flex-row border-b border-stroke-primary py-4 px-4 items-center">
            <Star />
            <View className="ml-3">
              <CustomText className="text-2xl font-lexend-medium text-dark-blue">
                {4.92}
              </CustomText>
              <CustomText className="text-sm text-secondary">Rating</CustomText>
            </View>
            <View className=" bg-stroke-primary h-px mx-4 my-4"></View>
          </View>
          <View className="flex justify-between py-4 px-4">
            <CustomText className="text-sm text-secondary">Comment</CustomText>
            <CustomText className="text-sm text-dark-blue">
              Very happy with my purchase!
            </CustomText>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => router.push(`/product/edit/${id}`)}
        className="bg-background-yellow rounded-2xl p-4 mt-16"
      >
        <CustomText className="text-dark-blue text-center text-base font-lexend-medium">
          Edit
        </CustomText>
      </Pressable>
    </ScrollView>
  );
}
