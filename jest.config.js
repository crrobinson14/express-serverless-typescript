module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  coverageDirectory: '<rootDir>/../reports/coverage',
  coveragePathIgnorePatterns: ['config'],
  coverageReporters: ['json', 'json-summary', 'text-summary', 'lcov', 'text', 'html'],
  testTimeout: 30000,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/test',
        filename: 'index.html',
        expand: true,
      },
    ],
  ],
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
  },
};
