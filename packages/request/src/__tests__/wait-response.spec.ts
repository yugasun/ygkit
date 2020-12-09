import { waitResponse } from '../utils/wait-response';

describe('@ygkit/object [waitResponse]', () => {
  const t1 = Date.now();

  describe('Test valid target response', () => {
    const callback = () => {
      return new Promise((resolve) => {
        const t2 = Date.now();
        const diffSecs = Math.round((t2 - t1) / 1000);
        setTimeout(() => {
          if (diffSecs < 3) {
            resolve({
              status: 2,
              otherStatus: 2,
              name: '@ygkit/request',
            });
          } else {
            resolve({
              status: 4,
              otherStatus: 4,
              name: '@ygkit/request',
            });
          }
        }, 500);
      });
    };

    const callbackError = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request Error'));
        }, 500);
      });
    };

    test('[targetProp = status] should get target response', async () => {
      const res = await waitResponse({
        callback,
        targetProp: 'status',
        targetResponse: 4,
        timeout: 5000,
      });
      expect(res).toEqual({
        status: 4,
        otherStatus: 4,
        name: '@ygkit/request',
      });
    });

    test('[targetProp = otherStatus] should get target response', async () => {
      const res = await waitResponse({
        callback,
        targetProp: 'otherStatus',
        targetResponse: 4,
        timeout: 5000,
      });
      expect(res).toEqual({
        status: 4,
        otherStatus: 4,
        name: '@ygkit/request',
      });
    });

    test('[start] should get target response', async () => {
      const res = await waitResponse({
        callback,
        targetProp: 'otherStatus',
        targetResponse: 4,
        timeout: 5000,
        start: Date.now() + 500,
      });
      expect(res).toEqual({
        status: 4,
        otherStatus: 4,
        name: '@ygkit/request',
      });
    });

    test('[loopGap] should get target response', async () => {
      const res = await waitResponse({
        callback,
        targetProp: 'otherStatus',
        targetResponse: 4,
        timeout: 5000,
        loopGap: 500,
      });
      expect(res).toEqual({
        status: 4,
        otherStatus: 4,
        name: '@ygkit/request',
      });
    });

    test('[start past 2 seconds] should reject timeout', async () => {
      try {
        await waitResponse({
          callback,
          targetProp: 'otherStatus',
          targetResponse: 4,
          timeout: 5000,
          start: Date.now() - 2000,
        });
      } catch (e) {
        expect(e).toMatch(
          '[TIMEOUT] Cannot complete in 5000ms, otherStatus: 2',
        );
      }
    });

    test('[default] should reject timeout', async () => {
      try {
        await waitResponse({
          callback,
          targetProp: 'status',
          targetResponse: 4,
          timeout: 1000,
        });
      } catch (e) {
        expect(e).toMatch('[TIMEOUT] Cannot complete in 1000ms, status: 2');
      }
    });

    test('[targetProp = status] should reject timeout', async () => {
      try {
        await waitResponse({
          callback,
          targetProp: 'status',
          targetResponse: 4,
          timeout: 1000,
        });
      } catch (e) {
        expect(e).toMatch('[TIMEOUT] Cannot complete in 1000ms, status: 2');
      }
    });

    test('should get request error', async () => {
      try {
        await waitResponse({
          callback: callbackError,
          targetProp: 'status',
          targetResponse: 4,
          timeout: 5000,
        });
      } catch (e) {
        expect(e).toEqual(new Error('Request Error'));
      }
    });
  });

  describe('Test null target response', () => {
    const callback = () => {
      return new Promise((resolve) => {
        const t2 = Date.now();
        const diffSecs = Math.round((t2 - t1) / 1000);
        setTimeout(() => {
          if (diffSecs < 3) {
            resolve({
              status: 2,
              otherStatus: 2,
              name: '@ygkit/request',
            });
          } else {
            resolve(null);
          }
        }, 500);
      });
    };

    test('should get null target response', async () => {
      const res = await waitResponse({
        callback,
        targetResponse: null,
        timeout: 5000,
      });
      expect(res).toEqual(null);
    });
  });
});
