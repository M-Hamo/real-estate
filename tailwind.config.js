module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#183B56",
        secondary: "#83899F",
        darkGrayBlue: "#8E8E93",
        lightBlue: "#3E97FF",
        darkGray: "#2E2E2E",
        darkGrayish: "#464E5F",
        disabled: "#B0BBD5",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
