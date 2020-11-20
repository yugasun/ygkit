module.exports = {
  roots: [
    '<rootDir>/packages/object/src',
    '<rootDir>/packages/request/src',
    '<rootDir>/packages/file/src',
    '<rootDir>/packages/bundler/src',
    '<rootDir>/packages/secure/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testRegex: '(/__tests__/deep-clone.(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
