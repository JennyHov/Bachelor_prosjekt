export default {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    "^.+\\.m?js$": "babel-jest" // This line ensures that both .js and .mjs files are processed by Babel.
  },
  transformIgnorePatterns: [ // This line ensures node_modules are ignored except for packages that need to be transformed.
    "/node_modules/(?!your-esm-package)"
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
