import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1024px'},
      'md': {'max': '767px'},
      'sm': {'max': '600px'},
      'xs': {'max': '400px'},
      '2xlup': {'min': '1536px'},
      'xlup': {'min': '1280px'},
      'lgup': {'min': '1025px'},
      'mdup': {'min': '768px'},
      'smup': {'min': '601px'},
      'xsup': {'min': '401px'},
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundSecondary: "var(--background-secondary)",
        backgroundTertiary: "var(--background-tertiary)",
        textPrimary: "var(--text-primary)",
        textSecodary: "var(--text-secondary)",
      },
      gridTemplateColumns: {
        // 'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;
