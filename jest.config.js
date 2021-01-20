module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/packages/object/src',
    '<rootDir>/packages/request/src',
    '<rootDir>/packages/file/src',
    '<rootDir>/packages/bundler/src',
    '<rootDir>/packages/secure/src',
    '<rootDir>/packages/password/src',
  ],
  testTimeout: 60000,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*\\.(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/__tests__/fixtures/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
