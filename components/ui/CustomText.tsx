import { cn } from "@/lib/utils";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface CustomTextProps extends RNTextProps {
  className?: string;
}

export function CustomText({ className, ...props }: CustomTextProps) {
  return <RNText className={cn("font-lexend", className)} {...props} />;
}
