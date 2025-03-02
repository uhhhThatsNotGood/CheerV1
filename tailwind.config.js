/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        SpGtskLight: "SpGtskLight",
        SpGtskReg: "SpGtskReg",
        SpGtskMid: "SpGtskMid",
        SpGtskSMBold: "SpGtskSMBold",
      },
    },
  },
  plugins: [],
};
