module.exports = {
  // Use TypeScript preset (remove if not using TypeScript)
  //preset: 'ts-jest',
  
  // Test environment (Node.js for server-side)
  testEnvironment: 'node',
  
  // Clear mock calls and instances between tests
  clearMocks: true,
  
  // Directory where coverage reports will be saved
  coverageDirectory: 'coverage',
  
  // File patterns for test discovery
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '!**/__tests__/integration/**' // Exclude integration tests
  ],
  
  // Module path aliases (matches your import paths)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust if using path aliases
  },
  
  // Files to include in coverage reports
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',           // Exclude type definitions
    '!src/index.js',            // Exclude main entry file
    '!src/server.js',           // Exclude server setup
  ],
  
  // Minimum coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Setup files run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  
  // File extensions to test
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  
  // Don't transform node_modules (except specific packages if needed)
  transformIgnorePatterns: [
    '/node_modules/(?!(module-to-transform)/)',
  ],
  
  // Display individual test results
  verbose: true,
  
  // Watch plugins (optional for development)
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ]
};