import { waitStatus } from './wait-status';

const t1 = Date.now();

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

test('[default] should get target status', async () => {
  const res = await waitStatus({
    callback,
    targetStatus: 4,
    timeout: 5000,
  });
  expect(res).toEqual({
    status: 4,
    otherStatus: 4,
    name: '@ygkit/request',
  });
});

test('[statusProp = status] should get target status', async () => {
  const res = await waitStatus({
    callback,
    statusProp: 'status',
    targetStatus: 4,
    timeout: 5000,
  });
  expect(res).toEqual({
    status: 4,
    otherStatus: 4,
    name: '@ygkit/request',
  });
});

test('[statusProp = otherStatus] should get target status', async () => {
  const res = await waitStatus({
    callback,
    statusProp: 'otherStatus',
    targetStatus: 4,
    timeout: 5000,
  });
  expect(res).toEqual({
    status: 4,
    otherStatus: 4,
    name: '@ygkit/request',
  });
});

test('[start] should get target status', async () => {
  const res = await waitStatus({
    callback,
    statusProp: 'otherStatus',
    targetStatus: 4,
    timeout: 5000,
    start: Date.now() + 500,
  });
  expect(res).toEqual({
    status: 4,
    otherStatus: 4,
    name: '@ygkit/request',
  });
});

test('[loopGap] should get target status', async () => {
  const res = await waitStatus({
    callback,
    statusProp: 'otherStatus',
    targetStatus: 4,
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
    await waitStatus({
      callback,
      statusProp: 'otherStatus',
      targetStatus: 4,
      timeout: 5000,
      start: Date.now() - 2000,
    });
  } catch (e) {
    expect(e).toMatch('Request Timeout.');
  }
});

test('[default] should reject timeout', async () => {
  try {
    await waitStatus({
      callback,
      targetStatus: 4,
      timeout: 1000,
    });
  } catch (e) {
    expect(e).toMatch('Request Timeout.');
  }
});

test('[statusProp = status] should reject timeout', async () => {
  try {
    await waitStatus({
      callback,
      statusProp: 'status',
      targetStatus: 4,
      timeout: 1000,
    });
  } catch (e) {
    expect(e).toMatch('Request Timeout.');
  }
});

test('should get request error', async () => {
  try {
    await waitStatus({
      callback: callbackError,
      statusProp: 'status',
      targetStatus: 4,
      timeout: 5000,
    });
  } catch (e) {
    expect(e).toEqual(new Error('Request Error'));
  }
});
