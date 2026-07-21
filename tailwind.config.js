export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "cream-bg": "#faf7f2",
        "forest-deep": "#25402f",
        primary: "#183829",
        "primary-container": "#2f4f3f",
        "amber-gold": "#c9a15a",
        secondary: "#795919",
        "pale-sage": "#d1e3d8",
        "on-surface": "#001d36",
        "on-surface-variant": "#424844",
        outline: "#727973",
        "outline-variant": "#c1c8c2",
        rust: { 50: "#f7ebe4", 400: "#a85a35", 600: "#8a4826", 700: "#75442b" },
        error: "#ba1a1a",
      },
      borderRadius: { card: "20px" },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
        numeric: ["'Space Grotesk'", "'Inter'", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["36px", { lineHeight: "44px", fontWeight: "600" }],
        "metric-lg": ["40px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-sm": ["13px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "500" }],
      },
      boxShadow: {
        editorial: "0 10px 30px -5px rgba(37, 64, 47, 0.08)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: { fadeIn: "fadeIn 0.7s ease-out forwards" },
    },
  },
  plugins: [],
};