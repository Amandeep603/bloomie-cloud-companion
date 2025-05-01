
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Bloomie-specific colors
        "bloomie-purple": "#9D84B7",
        "bloomie-pink": "#F7C5CC",
        "bloomie-yellow": "#FFE699",
        "bloomie-green": "#B5E6B3",
        // Additional mood colors
        "mood-happy": "#8BDB81", // light green for happy/😊
        "mood-sad": "#94C5F8",   // light blue for sad/😢
        "mood-angry": "#FF9C9C", // light red for angry/😡
        "mood-love": "#FFC0CB",  // pink for love/😍
        "mood-sleepy": "#D8BFD8", // lavender for sleepy/😴
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-small": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(157, 132, 183, 0.2)" },
          "50%": { boxShadow: "0 0 15px rgba(157, 132, 183, 0.6)" },
        },
        "mouth-talk": {
          "0%": { transform: "scaleY(0.8) scaleX(1)" },
          "25%": { transform: "scaleY(1.2) scaleX(0.8)" },
          "50%": { transform: "scaleY(0.9) scaleX(1.1)" },
          "75%": { transform: "scaleY(1.1) scaleX(0.9)" },
          "100%": { transform: "scaleY(0.8) scaleX(1)" },
        },
        "typing": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "blink": {
          "50%": { borderColor: "transparent" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "bounce-small": "bounce-small 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "mouth-talk": "mouth-talk 0.6s ease-in-out infinite",
        "typing": "typing 3.5s steps(40, end)",
        "blink": "blink .75s step-end infinite",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
