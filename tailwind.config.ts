import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                raycast: {
                    bg: '#1E1E1E', // Darker variant for main background
                    bgLighter: '#252525', // Slightly lighter for cards, inputs
                    bgLightest: '#2E2E2E', // Even lighter, for hover or active states
                    textPrimary: '#E0E0E0',
                    textSecondary: '#A0A0A0',
                    border: '#3A3A3A',
                    accent: '#007AFF', // A common modern blue
                    accentHover: '#0056b3',
                    danger: '#E53E3E',
                    dangerHover: '#C53030',
                }
            },
            borderRadius: {
                'md': '0.375rem', // Default md
                'lg': '0.5rem',   // Default lg
                'xl': '0.75rem',  // Raycast often uses slightly larger radii
            },
            boxShadow: {
                'input': '0 0 0 2px #3A3A3A', // Subtle border focus like Raycast
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Modern sans-serif, ensure you import Inter
            },
        },
    },
    plugins: [],
};
export default config;