module.exports = {
  testEnvironment: "jsdom", // Cambia 'node' a 'jsdom' para pruebas de frontend
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest", // Utiliza ts-jest si estás usando TypeScript
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"], // Para soportar ESM
  moduleNameMapper: {
    // Ajusta según tus alias de módulos o paths
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Si necesitas configuraciones específicas antes de las pruebas
};
