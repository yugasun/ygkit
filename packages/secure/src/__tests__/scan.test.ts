import { scan } from '../';

describe('@ygkit/secure [scan]', () => {
  test('should parse check', async () => {
    expect(scan()).toEqual(true);
  });
});
