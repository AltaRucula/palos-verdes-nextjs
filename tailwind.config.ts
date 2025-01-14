import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.gray['950'],
                secondary: colors.gray['900'],
                tertiary: colors.gray['700']
            }
        }
    },
    plugins: []
} satisfies Config;
