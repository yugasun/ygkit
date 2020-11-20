import { deepClone } from '..';

describe('@ygkit/object [deepClone]', () => {
  const child1 = {
    x: 1,
  };
  const obj = {
    a: 1,
    b: child1,
    c: 'string',
    d: true,
  };
  const arr = [1, child1];
  test('should get right result', async () => {
    expect(deepClone(null)).toEqual(null);
    expect(deepClone({ a: 1 })).toEqual({ a: 1 });
    expect(deepClone(obj)).toEqual(obj);
    expect(deepClone(obj)).not.toBe(obj);
    expect(deepClone(obj).b).not.toBe(child1);
    expect(deepClone(arr)).toEqual(arr);
    expect(deepClone(arr)).not.toBe(arr);
    expect(deepClone(arr)[1]).not.toBe(child1);
  });
});
