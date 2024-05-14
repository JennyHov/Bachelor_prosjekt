export default {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    "^.+\\.m?js$": "babel-jest" // Behandler både .js og .mjs filer med Babel.
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-esm-package)"
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/frontend/'], // Legg til '/frontend/' for å ignorere tester i frontend-mappen
};
