/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1: "var(--primary1)",
        secondary1: "var(--secondary1)",
        primary2: "var(--primary2)",
        secondary2: "var(--secondary2)",
        neutral1: "var(--neutral1)",
        neutral2: "var(--neutral2)",
      },
    },
  },
  plugins: [],
};
