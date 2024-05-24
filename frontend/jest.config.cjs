const path = require('path');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: path.resolve(__dirname, 'babel.config.cjs') }]
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Spesifikk mapping for CSS-filer
    '\\.(less|scss|sass|png|jpg|jpeg|gif|ttf|eot|svg|woff|woff2)$': 'identity-obj-proxy'
  }
};
