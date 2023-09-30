/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          keyframes: {
            "fade-in": {
              '50%': { scale: '0.9' },
              '100%': { scale: '1' },
            },
          },
          animation: {
            "fade-bing": 'fade-in 0.5s ease-in-out'
          } 
        }
    },
    plugins: [],
}