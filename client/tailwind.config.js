module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Asegúrate de que estas rutas incluyan tus archivos
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gray: "#808080",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#2C3E50",
        secundary: "#E67E22",
      },
      backgroundImage: {
        "black-to-gray":
          "linear-gradient(to bottom right, #2C3E50, #808080, #ffffff)",
      },
    },
  },
  plugins: [],
};
