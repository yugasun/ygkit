import { getProp } from '@ygkit/object';
import { sleep } from './sleep';

interface WaitResponseOptions {
  // async request
  callback: Function;
  // target response/property value
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
  targetResponse,
  timeout,
  loopGap = 1000,
  start = Date.now(),
  resolve,
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
      if (targetProp) {
        const propVal = getProp(response, targetProp);
        if (response && propVal === targetResponse) {
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
