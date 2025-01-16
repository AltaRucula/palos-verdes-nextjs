import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'selector', // Enable selector strategy for dark mode
    theme: {
        extend: {
            colors: {
                primary: {
                    light: colors.gray['100'],
                    dark: colors.gray['950'],
                },
                secondary: {
                    light: colors.gray['200'],
                    dark: colors.gray['900'],
                },
                tertiary: {
                    light: colors.gray['300'],
                    dark: colors.gray['700'],
                },
                highlight: {
                    light: colors.red['300'],
                    dark: colors.red['700'],
                    hover: {
                        light: colors.red['200'],
                        dark: colors.red['800'],
                    },
                },
                error: {
                    light: colors.red['500'],
                    dark: colors.red['300'],
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
