/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      background: "#DEE6ED",
      mainBlue: "#0E263ECC",
      primary: "#4f46e5", // Example purple
      secondary: "#22d3ee", // Example cyan
      accent: "#f59e0b", // Example amber
    },
    extend: {
      fontFamily: {
        lexend: ["Lexend_400Regular"],
        "lexend-medium": ["Lexend_500Medium"],
        "lexend-semibold": ["Lexend_600SemiBold"],
        "lexend-bold": ["Lexend_700Bold"],
      },
    },
  },
  plugins: [],
};
