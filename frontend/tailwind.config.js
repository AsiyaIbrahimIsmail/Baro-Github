/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "rgb(var(--color-text) / <alpha-value>)",
        black: "rgb(var(--color-inverse) / <alpha-value>)",
        glass: {
          DEFAULT: "rgb(var(--color-glass) / var(--glass-alpha))",
          border: "rgb(var(--color-border) / var(--border-alpha))",
          hover: "rgb(var(--color-glass-hover) / var(--glass-hover-alpha))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          glow: "rgb(var(--color-accent-glow) / <alpha-value>)",
          muted: "rgb(var(--color-accent-muted) / <alpha-value>)",
        },
        "on-accent": "#ffffff",
        terminal: "#09090b",
        "terminal-text": "#e2e8f0",
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          raised: "rgb(var(--color-surface-raised) / <alpha-value>)",
          overlay: "rgb(var(--color-surface-overlay) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-sm": "0 0 10px rgba(99, 102, 241, 0.2)",
        glass: "0 8px 32px rgb(var(--color-shadow) / 0.18)",
      },
      backdropBlur: {
        glass: "16px",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(99, 102, 241, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
