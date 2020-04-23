import { join, basename, isAbsolute } from 'path';
import { statSync } from 'fs';
import { create as archiver, Format } from 'archiver';
import { createReadStream, createWriteStream } from 'fs-extra';
import { sync as globby } from 'globby';
import { fileExt } from './file-ext';

const VALID_FORMATS = ['zip', 'tar'];
const isValidFormat = (format: string) => VALID_FORMATS.indexOf(format) !== -1;
const isNil = (o: any) => o == null;

interface FileObject {
  input: string;
  output: string;
}

async function zipDirectory(
  inputDirPath: string,
  outputFilePath: string,
  include: string[] = [],
  exclude: string[] = [],
  disableTraverse: boolean = false,
  prefix?: string,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const format = fileExt(outputFilePath);

    if (!isValidFormat(format)) {
      reject(new Error(`Unsupport format ${format}. Either "zip" or "tar"`));
      return;
    }

    const output = createWriteStream(outputFilePath);
    const archive = archiver(format as Format, {
      zlib: { level: 9 },
    });

    if (disableTraverse) {
      output.on('open', async () => {
        archive.pipe(output);
        archive.directory(inputDirPath, false);
        archive.finalize();
      });
    } else {
      const patterns = ['**'];

      if (!isNil(exclude)) {
        exclude.forEach((excludedItem) => patterns.push(`!${excludedItem}`));
      }

      const files = globby(patterns, { cwd: inputDirPath, dot: true })
        .sort() // we must sort to ensure correct hash
        .map((file: string) => ({
          input: join(inputDirPath, file),
          output: prefix ? join(prefix, file) : file,
        }));

      output.on('open', async () => {
        archive.pipe(output);

        // we must set the date to ensure correct hash
        files.forEach((file: FileObject) =>
          archive.append(createReadStream(file.input), {
            name: file.output,
            date: new Date(0),
          }),
        );

        if (!isNil(include)) {
          for (let i = 0, len = include.length; i < len; i++) {
            const curInclude = include[i];
            // if is relative directory, we should join with process.cwd
            const curIncludePath = isAbsolute(curInclude)
              ? curInclude
              : join(process.cwd(), curInclude);

            if (statSync(curIncludePath).isDirectory()) {
              const includeFiles = globby(patterns, {
                cwd: curIncludePath,
                dot: true,
              });
              includeFiles
                .sort()
                .map((file: string) => ({
                  input: join(curIncludePath, file),
                  output: prefix ? join(prefix, file) : file,
                }))
                .forEach((file: FileObject) =>
                  archive.append(createReadStream(file.input), {
                    name: file.output,
                    date: new Date(0),
                  }),
                );
            } else {
              const stream = createReadStream(curInclude);
              archive.append(stream, {
                name: basename(curInclude),
                date: new Date(0),
              });
            }
          }
        }

        archive.finalize();
      });
    }
    archive.on('error', (err: Error) => reject(err));
    output.on('close', () => resolve(outputFilePath));
  });
}

export { zipDirectory };
