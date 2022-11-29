module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: ['*/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  testTimeout: 5000
};