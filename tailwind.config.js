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
            keyframes: {
                bubbleUp: {
                    '0%': { transform: 'translateY(10px)', opacity: 0 },
                    '100%': { transform: 'translateY(-10px)', opacity: 1 }
                },
                cauldronRock: {
                    '0%': { transform: 'rotate(-10deg) scaleY(1.1)' },
                    '50%': { transform: 'rotate(0) scaleY(1)' },
                    '100%': { transform: 'rotate(10deg) scaleY(1.1)' }
                },
                pulseIntense: {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.2 },
                    '100%': { opacity: 1 }
                }
            },
            animation: {
                'pulse-1': 'pulse 1s linear infinite',
                'pulse-2': 'pulse 1.5s linear infinite',
                'pulse-3': 'pulse 2s linear infinite',
                'pulse-4': 'pulse 2.5s linear infinite',
                'pulse-5': 'pulse 3s linear infinite',
                'bubble-up': 'bubbleUp 2s ease-in-out infinite',
                'bubble-up-slow': 'bubbleUp 3.5s ease-in-out infinite',
                'cauldron-rock': 'cauldronRock 1.5s ease-in-out alternate infinite',
                'pulse-intense': 'pulseIntense 1s ease-in-out infinite'
            }
        }
    },
    plugins: []
};
