/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f131e",
        surface: "#0f131e",
        "surface-dim": "#0f131e",
        "surface-bright": "#353945",
        "surface-container-lowest": "#0a0e19",
        "surface-container-low": "#171b27",
        "surface-container": "#1b1f2b",
        "surface-container-high": "#262a36",
        "surface-container-highest": "#313441",
        "on-surface": "#dfe2f2",
        "on-surface-variant": "#c7c4d7",
        primary: "#c0c1ff",
        "on-primary": "#1000a9",
        "primary-container": "#8083ff",
        "on-primary-container": "#0d0096",
        secondary: "#5de6ff",
        "on-secondary": "#00363e",
        "secondary-container": "#00cbe6",
        "on-secondary-container": "#00515d",
        tertiary: "#4edea3",
        "on-tertiary": "#003824",
        "tertiary-container": "#00885d",
        "on-tertiary-container": "#000703",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        outline: "#908fa0",
        "outline-variant": "#464554",
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      animation: {
        "agent-pulse": "agent-pulse 2s infinite",
        "glow-cyan": "glow-cyan 3s ease-in-out infinite alternate",
      },
      keyframes: {
        "agent-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(93, 230, 255, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(93, 230, 255, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(93, 230, 255, 0)" },
        },
        "glow-cyan": {
          "0%": { shadow: "0 0 10px rgba(93, 230, 255, 0.2)" },
          "100%": { shadow: "0 0 30px rgba(93, 230, 255, 0.5)" },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
