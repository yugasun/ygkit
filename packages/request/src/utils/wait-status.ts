import { sleep } from './sleep';

interface WaitStatusOptions {
  callback: Function;
  statusProp: string;
  // wait status
  targetStatus: any;
  // timeout mini seconds
  timeout: number;
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
      if (detail[statusProp] === targetStatus) {
        resolve(detail);
      } else {
        await sleep(1000);
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
