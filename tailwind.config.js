/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'cloud': '#F8F9FA',
        'anti-flash-white': '#E9ECEF',
        'platinum': '#DEE2E6',
        'french-gray': '#CED4DA',
        'french-mid-gray': '#ADB5BD',
        'slate-gray': '#6C757D',
        'outer-space': '#495057',
        'onyx': '#343A40',
        'eerie-black': '#212529',
        'gold': '#F4CE14',
        'seaweed': '#495E57',
        'darknight': '#202124',
        'midnight': '#3c4042',
        'davy-gray': '#505A5B',
        'cool-gray': '#8F91A2',
        'powder-blue': '#94B0DA',
        'alice-blue': '#DCEDFF',
        popover: "hsl(var(--popover))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      keyframes: {
        "shine": {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        "shine": "shine 8s ease-in-out infinite",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
