import { createHash, Utf8AsciiLatin1Encoding } from 'crypto';
import { readFileSync } from 'fs';

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';

function hash(
  content: string,
  encoding: Utf8AsciiLatin1Encoding,
  type: HashAlgorithm = 'md5',
): string {
  return createHash(type)
    .update(content, encoding)
    .digest('hex');
}

function fileHash(filePath: string): string {
  return hash(readFileSync(filePath, 'utf8'), 'utf8', 'md5');
}

export { hash, fileHash };
