import { waitStatus } from './wait-status';

const callback = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 4,
        name: '@node-utils/request',
      });
    }, 2000);
  });
};

test('should get target status', async () => {
  const res = await waitStatus({
    callback,
    statusProp: 'status',
    targetStatus: 4,
    timeout: 3000,
  });
  expect(res).toEqual({
    status: 4,
    name: '@node-utils/request',
  });
});

test('should reject timeout', async () => {
  expect(
    waitStatus({
      callback,
      statusProp: 'status',
      targetStatus: 4,
      timeout: 1000,
    }),
  ).rejects.toMatch('Request Timeout.');
});
