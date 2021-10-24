/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: [
    '**/__tests__/**/*.(js|ts)?(x)',
    '**/?(*.)+(spec|test).(js|ts)?(x)',
  ],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    ...tsjPreset.transform,
  },
  // verbose: false,
};
