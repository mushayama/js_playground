module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest", // Use ts-jest for TypeScript files
  },
  testPathIgnorePatterns: ["/node_modules/"], // Ignore node_modules
  roots: ["<rootDir>/"], // Run tests for all subprojects
  collectCoverageFrom: ["lld/**/*.{ts,js}"], // Collect coverage from all subprojects
  coverageDirectory: "<rootDir>/coverage", // Store coverage reports in a root-level folder
  globals: {
    "ts-jest": {
      isolatedModules: true, // Speed up tests by isolating TypeScript compilation
    },
  },
};
