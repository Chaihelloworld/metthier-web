import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '.*\\.spec\\.tsx?$',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default config;
