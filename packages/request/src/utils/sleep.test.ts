import { sleep } from './sleep';

test('should sleep 1 seconds', async () => {
  const t1 = Date.now();
  await sleep(1000);
  const t2 = Date.now();
  expect(Math.round((t2 - t1) / 1000)).toBe(1);
});
