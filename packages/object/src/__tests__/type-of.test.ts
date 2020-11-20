import { typeOf } from '../';

describe('@ygkit/object [typeOf]', () => {
  test('should get right type of input', async () => {
    expect(typeOf('a')).toBe('String');
    expect(typeOf(1)).toBe('Number');
    expect(typeOf(true)).toBe('Boolean');
    expect(typeOf(false)).toBe('Boolean');
    expect(typeOf({})).toBe('Object');
    expect(typeOf(undefined)).toBe('Undefined');
    expect(typeOf(null)).toBe('Null');
    expect(typeOf(NaN)).toBe('Number');
    expect(typeOf(new Map())).toBe('Map');
    expect(typeOf(new WeakMap())).toBe('WeakMap');
    expect(typeOf(new Set())).toBe('Set');
    expect(typeOf(new WeakSet())).toBe('WeakSet');
    expect(typeOf(Symbol('1'))).toBe('Symbol');
  });
});
