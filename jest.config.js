module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/../reports/coverage',
  coveragePathIgnorePatterns: ['config'],
  coverageReporters: ['json', 'json-summary', 'text-summary', 'lcov', 'text', 'html'],
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
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
