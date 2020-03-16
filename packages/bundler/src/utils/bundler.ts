import { homedir } from 'os';
import { join, dirname } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import { minify } from 'terser';
const Webmake = require('webmake');

interface CacheOption {
  cachePath?: string;
  filename?: string;
  mode?: 'dev' | 'prod' | any;
}

interface BundlerOption {
  input: string;
  output?: string;
  mode?: 'dev' | 'prod' | any;
  cacheOption?: CacheOption | boolean;
}

interface BundlerOutput {
  code: string;
  cacheFile: string;
  outputFile: string;
}

const getCachePath = ({ cachePath, mode, filename }: CacheOption) => {
  const distPath = cachePath ? cachePath : join(homedir(), `.bundler/cache`);
  const cacheFilename = `${filename || Date.now()}${
    mode === 'dev' ? '.dev' : ''
  }.js`;
  return `${distPath}/${cacheFilename}`;
};

async function bundler(options: BundlerOption): Promise<BundlerOutput> {
  let bundleCode = await new Promise((resolve, reject) =>
    Webmake(
      options.input,
      { ignoreErrors: true, cjs: true },
      (error: Error, code: string) => {
        error ? reject(error) : resolve(code);
      },
    ),
  );
  if (options.mode !== 'dev') {
    const minifyResult = minify(bundleCode as string);
    if (minifyResult.error) {
      throw minifyResult.error;
    }
    bundleCode = minifyResult.code;
  }

  const output: BundlerOutput = {
    code: bundleCode as string,
    cacheFile: '',
    outputFile: '',
  };

  if (options.cacheOption) {
    const cacheOption = options.cacheOption === true ? {} : options.cacheOption;
    const cacheFilename = getCachePath({
      ...cacheOption,
      mode: options.mode,
    });
    await ensureDir(dirname(cacheFilename));
    await writeFile(cacheFilename, bundleCode);
    output.cacheFile = cacheFilename;
  }
  if (options.output) {
    await ensureDir(dirname(options.output));
    await writeFile(options.output, bundleCode);
    output.outputFile = options.output;
  }
  return output;
}

export { bundler };
