module.exports = {
  roots: [
    '<rootDir>/packages/object/src',
    '<rootDir>/packages/request/src',
    '<rootDir>/packages/file/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
