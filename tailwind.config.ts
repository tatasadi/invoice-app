import type { Config } from "tailwindcss"

const config = {
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
        "purple-primary": "hsl(252, 94%, 67%)", // #7C5DFA
        "purple-secondary": "hsl(252, 100%, 73%)", // #9277FF
        "navy-dark": "hsl(233, 31%, 17%)", // #1E2139
        "navy-medium": "hsl(233, 30%, 21%)", // #252945
        "blue-light": "hsl(231, 73%, 93%)", // #DFE3FA
        "blue-gray": "hsl(231, 20%, 61%)", // #888EB0
        "blue-muted": "hsl(231, 37%, 63%)", // #7E88C3
        black: "hsl(228, 29%, 7%)", // #0C0E16
        "red-primary": "hsl(0, 80%, 63%)", // #EC5757
        "red-light": "hsl(0, 100%, 80%)", // #9277FF (Note: Color appears to have been mistyped, assuming it is actually #FF7E7E)
        "background-light": "hsl(240, 27%, 98%)", // #F8F8FB
        "navy-darkest": "hsl(233, 30%, 11%)", // #141625
      },
      fontSize: {
        "heading-l": [
          "36px",
          {
            lineHeight: "33px",
            letterSpacing: "-1px",
            fontWeight: "bold",
          },
        ],
        "heading-m": [
          "24px",
          {
            lineHeight: "22px",
            letterSpacing: "-0.75px",
            fontWeight: "bold",
          },
        ],
        "heading-s": [
          "15px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.25px",
            fontWeight: "bold",
          },
        ],
        "heading-s-variant": [
          "15px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.25px",
            fontWeight: "bold",
          },
        ],
        body: [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.1px",
            fontWeight: "500", // Medium
          },
        ],
        "body-variant": [
          "13px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.25px",
            fontWeight: "500", // Medium
          },
        ],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
