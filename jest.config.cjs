module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',


  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: ['*/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],

  testTimeout: 20000,
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/mocks/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },

  
  modulePaths: ['<rootDir>']

};