import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // path to Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['./src/tests/jestPostSetup.ts'],
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

/*
To test environment variables directly, load them manually in a separate setup
script or in your jest.config.js file. For more information,
please see:
https://nextjs.org/docs/basic-features/environment-variables#test-environment-variables
*/
