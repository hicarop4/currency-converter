/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      gradientColorStops: {
        "chart-gradient-0": "var(--chart-gradient-from)",
        "chart-gradient-50": "var(--chart-gradient-to)",
      },
      colors: {
        highlight: "var(--highlight)",
      },
    },
  },
  plugins: [],
};
