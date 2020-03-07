import { hash, fileHash } from '../index';
import { join } from 'path';

const testFile = join(__dirname, 'code/test.txt');

describe('@ygkit/file [hash]', () => {
  test('[default] should get hash string value', async () => {
    expect(hash('hello world', 'utf8')).toBe(
      '5eb63bbbe01eeed093cb22bb8f5acdc3',
    );
  });
  test('[md5] should get hash string value', async () => {
    expect(hash('hello world', 'utf8', 'md5')).toBe(
      '5eb63bbbe01eeed093cb22bb8f5acdc3',
    );
  });
  test('[sha1] should get hash string value', async () => {
    expect(hash('hello world', 'utf8', 'sha1')).toBe(
      '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
    );
  });
  test('[sha256] should get hash string value', async () => {
    expect(hash('hello world', 'utf8', 'sha256')).toBe(
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    );
  });
  test('[sha512] should get hash string value', async () => {
    expect(hash('hello world', 'utf8', 'sha512')).toBe(
      '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f',
    );
  });
});

describe('@ygkit/file [fileHash]', () => {
  test('should get hash string value', async () => {
    expect(fileHash(testFile)).toBe('6f5902ac237024bdd0c176cb93063dc4');
  });
});
