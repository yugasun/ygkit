import { fileExt } from '../index';

describe('@ygkit/file [hash]', () => {
  test('[valid filename] should get empty value', async () => {
    expect(fileExt('text.txt')).toBe('txt');
  });
  test('[invalid filename] should get empty value', async () => {
    expect(fileExt('text.')).toBe('');
    expect(fileExt('')).toBe('');
  });
});
