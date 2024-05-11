import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/'],

  resetMocks: true,

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  testMatch: [
    '**/tests/**/*.ts',
    '**/?(*.)+(spec|test).ts',
  ],

  reporters: ['default'],

  collectCoverage: true,

  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', 'jest.config.ts'],
};

export default config;
