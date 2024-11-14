/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography')

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        // Add all possible color combinations
        {
            pattern: /(from|to|via|bg|text|border|ring|shadow)-(violet|fuchsia|purple|indigo|cyan|blue|red|rose|pink|emerald|green|teal|amber|orange|yellow|slate|gray|neutral|lime)-([45678]00|900)(\/20)?/,
            variants: ['hover', 'focus', 'peer-checked'],
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [
        typography,
    ],
} 