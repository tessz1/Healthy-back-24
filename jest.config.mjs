export default {
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
  transform: {
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  testEnvironment: "jsdom",
};
