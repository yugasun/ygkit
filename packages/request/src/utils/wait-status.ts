import { sleep } from './sleep';

interface WaitStatusOptions {
  callback: Function;
  statusProp?: string;
  // wait status
  targetStatus: any;
  // timeout mini seconds
  timeout: number;
  // loop gap in mini seconds
  loopGap?: number;
  // start mini seconds
  start?: number;
  // promise resolve
  resolve?: (value?: any) => void;
  // promise reject
  reject?: (value?: any) => void;
}

async function waitStatus({
  callback,
  statusProp = 'status',
  // wait status
  targetStatus,
  // timeout mini seconds
  timeout,
  loopGap = 1000,
  // start mini seconds
  start = Date.now(),
  // promise resolve
  resolve,
  // promise reject
  reject,
}: WaitStatusOptions): Promise<any> {
  const now = Date.now();
  return new Promise(async (res, rej) => {
    try {
      resolve = resolve || res;
      reject = reject || rej;
      // timeout
      if (now - start > timeout) {
        reject(new Error('Request Timeout.'));
      }
      const detail = await callback();
      // 4: deploying, 1: created
      if (detail && detail[statusProp] === targetStatus) {
        resolve(detail);
      } else {
        await sleep(loopGap);
        return waitStatus({
          callback,
          statusProp,
          targetStatus,
          timeout,
          start,
          resolve,
          reject,
        });
      }
    } catch (e) {
      reject && reject(e);
    }
  });
}

export { waitStatus };
