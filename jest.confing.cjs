module.exports = {
  testEnvironment: 'node',
  transform: {},
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/server.js'
  ],
  coverageThreshold: {
        global: {
            lines: 50,
        },
    },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  verbose: true
};