import { homedir } from 'os';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { bundler } from '../utils/bundler';

describe('@ygkit/bundler', () => {
  const defaultCacheDir = `${homedir()}/.bundler/cache`;
  const distCacheDir = join(join(__dirname, 'dist/cache'));
  const codePath = join(__dirname, 'code/index.js');
  const bundlePath = join(__dirname, 'dist/bundle.js');
  const bundleMinPath = join(__dirname, 'dist/bundle.min.js');

  afterAll(() => {});

  describe('[dev mode]', () => {
    test('[dev mode] expect generate bundle file', async () => {
      await bundler({
        input: codePath,
        mode: 'dev',
        output: bundlePath,
      });
      expect(existsSync(bundlePath)).toBe(true);
    });

    test('[dev mode] expect get right code string', async () => {
      const { code } = await bundler({
        input: codePath,
        mode: 'dev',
      });
      expect(code).toBe(readFileSync(bundlePath, 'utf8'));
    });

    test('[dev mode] expect generate right cache code to default path', async () => {
      const { cacheFile } = await bundler({
        input: codePath,
        mode: 'dev',
        cacheOption: true,
      });
      expect(existsSync(cacheFile)).toBe(true);
      expect(readFileSync(cacheFile, 'utf8')).toBe(
        readFileSync(bundlePath, 'utf8'),
      );
    });

    test('[dev mode] expect generate right cache code to target path', async () => {
      const { cacheFile } = await bundler({
        input: codePath,
        mode: 'dev',
        cacheOption: {
          cachePath: distCacheDir,
        },
      });
      expect(existsSync(cacheFile)).toBe(true);
      expect(readFileSync(cacheFile, 'utf8')).toBe(
        readFileSync(bundlePath, 'utf8'),
      );
    });

    test('[dev mode with cache filename] expect generate right cache code to default path', async () => {
      await bundler({
        input: codePath,
        mode: 'dev',
        cacheOption: {
          filename: 'hello',
        },
      });
      expect(existsSync(`${defaultCacheDir}/hello.dev.js`)).toBe(true);
      expect(readFileSync(`${defaultCacheDir}/hello.dev.js`, 'utf8')).toBe(
        readFileSync(bundlePath, 'utf8'),
      );
    });

    test('[dev mode with cache filename] expect generate right cache code to target path', async () => {
      await bundler({
        input: codePath,
        mode: 'dev',
        cacheOption: {
          filename: 'hello',
          cachePath: distCacheDir,
        },
      });
      expect(existsSync(`${distCacheDir}/hello.dev.js`)).toBe(true);
      expect(readFileSync(`${distCacheDir}/hello.dev.js`, 'utf8')).toBe(
        readFileSync(bundlePath, 'utf8'),
      );
    });
  });

  describe('[prod mode]', () => {
    test('[prod mode] expect generate bundle file', async () => {
      await bundler({
        input: codePath,
        mode: 'prod',
        output: bundleMinPath,
      });
      expect(existsSync(bundleMinPath)).toBe(true);
    });

    test('[prod mode] expect get right code string', async () => {
      const { code } = await bundler({
        input: codePath,
        mode: 'prod',
      });
      expect(code).toBe(readFileSync(bundleMinPath, 'utf8'));
    });

    test('[prod mode] expect generate right cache code to default path', async () => {
      const { cacheFile } = await bundler({
        input: codePath,
        mode: 'prod',
        cacheOption: true,
      });
      expect(existsSync(cacheFile)).toBe(true);
      expect(readFileSync(cacheFile, 'utf8')).toBe(
        readFileSync(bundleMinPath, 'utf8'),
      );
    });

    test('[prod mode] expect generate right cache code to target path', async () => {
      const { cacheFile } = await bundler({
        input: codePath,
        mode: 'prod',
        cacheOption: {
          cachePath: distCacheDir,
        },
      });
      expect(existsSync(cacheFile)).toBe(true);
      expect(readFileSync(cacheFile, 'utf8')).toBe(
        readFileSync(bundleMinPath, 'utf8'),
      );
    });

    test('[prod mode with cache filename] expect generate right cache code to default path', async () => {
      await bundler({
        input: codePath,
        mode: 'prod',
        cacheOption: {
          filename: 'hello',
        },
      });
      expect(existsSync(`${defaultCacheDir}/hello.js`)).toBe(true);
      expect(readFileSync(`${defaultCacheDir}/hello.js`, 'utf8')).toBe(
        readFileSync(bundleMinPath, 'utf8'),
      );
    });

    test('[prod mode with cache filename] expect generate right cache code to target path', async () => {
      await bundler({
        input: codePath,
        mode: 'prod',
        cacheOption: {
          filename: 'hello',
          cachePath: distCacheDir,
        },
      });
      expect(existsSync(`${distCacheDir}/hello.js`)).toBe(true);
      expect(readFileSync(`${distCacheDir}/hello.js`, 'utf8')).toBe(
        readFileSync(bundleMinPath, 'utf8'),
      );
    });
  });

  describe('[get error]', () => {
    test('should throw error', async () => {
      expect(
        bundler({
          input: join(__dirname, 'code/error-code.js'),
          mode: 'prod',
        }),
      ).rejects.toThrowError();
    });
  });
});
