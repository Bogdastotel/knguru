const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the base config
const config = getDefaultConfig(__dirname);

// Modify asset/file extensions to support SVG
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// Wrap it with NativeWind support
module.exports = withNativeWind(config, {
  input: "./global.css", // optional
});
