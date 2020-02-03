import { getProp } from '../utils/get-prop';

describe('@ygkit/object [getProp]', () => {
  const obj = {
    a: 1,
    b: 2,
    c: {
      d: 3,
    },
  };

  test('should get right prop value', async () => {
    expect(getProp(obj, 'a')).toBe(1);
    expect(getProp(obj, 'b')).toBe(2);
    expect(getProp(obj, 'foo')).toBe(undefined);
    expect(getProp(obj, 'c')).toEqual({
      d: 3,
    });
    expect(getProp(obj, 'c.d')).toBe(3);
    expect(getProp(obj, 'c.e')).toBe(undefined);
  });
});
