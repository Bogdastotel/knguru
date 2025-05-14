/** @type {import('tailwindcss').Config} */
module.exports = {
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
      primary: "#2555E7",
      secondary: "#22d3ee",
      accent: "#f59e0b",
      "dark-blue": "#11273D",
    },
    extend: {
      colors: {
        background: "#DEE6ED",
        "background-yellow": "#FFD500",
        "background-price": "#F4F6F8",
        white: "#FFFFFF",
        "main-blue": "#0E263ECC",
        card: "#FFFFFF",
        "stroke-primary": "#EBEEF1",
        "stroke-secondary": "#F4F6F8",
        "dark-blue": "#11273D",
        "primary-blue": "#2555E7",
        secondary: "#566A7C",
        accent: "#f59e0b",
      },
      fontFamily: {
        lexend: ["Lexend_400Regular"],
        "lexend-medium": ["Lexend_500Medium"],
        "lexend-semibold": ["Lexend_600SemiBold"],
        "lexend-bold": ["Lexend_700Bold"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "product-title-lg": ["32px", "40px"],
        "product-title-xl": ["40px", "48px"],
        // Add semantic names for product card
        "product-title": ["16px", "24px"],
        "product-meta": ["14px", "20px"],
      },
      borderRadius: {
        xl: "12px",
        10: "10px",
      },
      height: {
        px: "1px",
        0.5: "0.5px",
      },
      width: {
        "2/5": "40%",
        "48p": "48%",
      },
      spacing: {
        6.5: "26px",
      },
    },
  },
  plugins: [],
};
