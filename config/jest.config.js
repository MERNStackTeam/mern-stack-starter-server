const path = require('path');

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/database/**/*.[tj]s',
    '<rootDir>/routes/**/*.[tj]s',
  ],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js'],
  rootDir: __dirname,
  setupFiles: [path.resolve(__dirname, 'jest.setup.js')], // Use absolute path
  testEnvironment: 'node',
  testMatch: ['../**/?(*.)+(spec|test).[tj]s'], // Updated path
  transform: {
    '^.+\\.[tj]s$': 'babel-jest',
  },
};
