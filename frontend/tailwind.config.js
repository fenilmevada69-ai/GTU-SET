/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb", // Gray-50
        surface: "#ffffff",    // White
        "on-surface": "#111827", // Gray-900
        "on-surface-variant": "#6b7280", // Gray-500
        primary: "#6366f1",    // Indigo-500
        "on-primary": "#ffffff",
        secondary: "#0ea5e9",  // Sky-500
        tertiary: "#8b5cf6",   // Violet-500
        success: "#10b981",    // Emerald-500
        warning: "#f59e0b",    // Amber-500
        error: "#f43f5e",      // Rose-500
        outline: "#e5e7eb",    // Gray-200
        "outline-variant": "#d1d5db", // Gray-300
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
