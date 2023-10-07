/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM sans', 'sans-serif'],
                serif: ['Caudex', 'serif']
            },
            colors: {
                'dark-brown': '#3A300A'
            },
            animation: {
                'pulse-1': 'pulse 1s linear infinite',
                'pulse-2': 'pulse 1.5s linear infinite',
                'pulse-3': 'pulse 2s linear infinite',
                'pulse-4': 'pulse 2.5s linear infinite',
                'pulse-5': 'pulse 3s linear infinite'
            }
        }
    },
    plugins: []
};
