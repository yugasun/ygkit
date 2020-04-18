import { getProp } from '@ygkit/object';
import { sleep } from './sleep';

interface WaitResponseOptions {
  // async request
  callback: Function;
  // target response
  targetResponse?: any;
  // target response property
  targetProp?: string;
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

async function waitResponse({
  callback,
  targetProp,
  // wait status
  targetResponse,
  // timeout mini seconds
  timeout,
  loopGap = 1000,
  // start mini seconds
  start = Date.now(),
  // promise resolve
  resolve,
  // promise reject
  reject,
}: WaitResponseOptions): Promise<any> {
  const now = Date.now();
  return new Promise(async (res, rej) => {
    try {
      resolve = resolve || res;
      reject = reject || rej;
      // timeout
      if (now - start > timeout) {
        reject(new Error('Request Timeout'));
      }
      const response = await callback();
      if (targetResponse) {
        if (!targetProp) {
          reject(new Error('Unknow target response property'));
        }
        const prop = getProp(response, targetProp);
        if (response && prop === targetResponse) {
          resolve(response);
        } else {
          await sleep(loopGap);
          return waitResponse({
            callback,
            targetProp,
            targetResponse,
            timeout,
            start,
            resolve,
            reject,
          });
        }
      } else {
        if (response === targetResponse) {
          resolve(response);
        } else {
          return waitResponse({
            callback,
            targetProp,
            targetResponse,
            timeout,
            start,
            resolve,
            reject,
          });
        }
      }
    } catch (e) {
      reject && reject(e);
    }
  });
}

export { waitResponse };
