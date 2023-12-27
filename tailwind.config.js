/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        placeHolderShimmer: "placeHolderShimmer .5s forwards",
        fadeUP: "fadeUP .5s forwards",
        fadeLater: "fadeLater 1s forwards",
      },
      keyframes: {
        
        fadeLater: {
          "0%": {opacity: "0" },
          "80%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUP: {
          "0%": { transform: "translateY(2rem)", opacity: "0" },
          "100%": { transform: "translateY(0rem)", opacity: "1" },
        },
        placeHolderShimmer: {
          "0%": {
            backgroundPosition: "-468px 0",
          },
          "100%": {
            backgroundPosition: "468px 0",
          },
        },
      },
    },
  },
  plugins: [],
};
