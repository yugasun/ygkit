import { zipDirectory } from '../index';
import { join } from 'path';
import { existsSync, rmdirSync, mkdirSync, unlinkSync } from 'fs';
const inputDirPath = join(__dirname, 'code');
const outputDir = join(__dirname, 'output');
const outputPath = join(outputDir, 'code.zip');

beforeAll(() => {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }
});
afterAll(() => {
  rmdirSync(outputDir, {
    recursive: true,
  });
});
afterEach(() => {
  if (existsSync(outputPath)) {
    unlinkSync(outputPath);
  }
});

describe('@ygkit/file [hash]', () => {
  test('[default] should generate zip file', async () => {
    await zipDirectory(inputDirPath, outputPath);
    const exist = existsSync(outputPath);
    expect(exist).toBe(true);
  });

  test('[exclude file] should generate zip file', async () => {
    await zipDirectory(inputDirPath, outputPath, [], ['exclude-file.txt']);
    const exist = existsSync(outputPath);
    expect(exist).toBe(true);
  });

  test('[exclude directory] should generate zip file', async () => {
    await zipDirectory(inputDirPath, outputPath, [], ['exclude']);
    const exist = existsSync(outputPath);
    expect(exist).toBe(true);
  });

  test('[include file] should generate zip file', async () => {
    await zipDirectory(inputDirPath, outputPath, [
      join(__dirname, 'include/include-file.txt'),
    ]);
    const exist = existsSync(outputPath);
    expect(exist).toBe(true);
  });

  test('[include directory] should generate zip file', async () => {
    await zipDirectory(inputDirPath, outputPath, [join(__dirname, 'include')]);
    const exist = existsSync(outputPath);
    expect(exist).toBe(true);
  });

  test('[include & exclude] should generate zip file', async () => {
    await zipDirectory(
      inputDirPath,
      outputPath,
      [join(__dirname, 'include')],
      ['exclude'],
    );
    const exist = existsSync(outputPath);
    expect(exist).toBe(true);
  });
  test('[unsupport format] should throw error', async () => {
    expect(
      zipDirectory(inputDirPath, outputPath.replace('zip', 'gz')),
    ).rejects.toEqual(new Error(`Unsupport format gz. Either "zip" or "tar"`));
  });
});
