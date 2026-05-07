import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Catppuccin Latte
        bg:       "#eff1f5",  // base
        surface:  "#e6e9ef",  // mantle
        border:   "#ccd0da",  // surface0
        muted:    "#bcc0cc",  // surface1
        text:     "#4c4f69",  // text
        dim:      "#6c6f85",  // subtext0
        cyan:     "#1e66f5",  // blue
        green:    "#40a02b",  // green
        amber:    "#fe640b",  // peach
        red:      "#d20f39",  // red
        purple:   "#8839ef",  // mauve
        pink:     "#ea76cb",  // pink
        teal:     "#179299",  // teal
        lavender: "#7287fd",  // lavender
        yellow:   "#df8e1d",  // yellow
      },
      fontFamily: {
        sans:      ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono:      ["'Geist Mono'", "ui-monospace", "monospace"],
        display:   ["'Instrument Serif'", "serif"],
        helvetica: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
