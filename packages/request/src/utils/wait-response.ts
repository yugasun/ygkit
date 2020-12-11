import { getProp, typeOf } from '@ygkit/object';
import { sleep } from './sleep';

interface TimeoutError extends Error {
  response?: any;
}

interface WaitResponseOptions {
  // async request
  callback: Function;
  // target response/property value
  targetResponse?: any;
  // fail response/property value
  failResponse?: any;
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
  failResponse,
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
      const response = await callback();
      // timeout
      if (now - start > timeout) {
        const errMsg = targetProp
          ? `[TIMEOUT] Cannot complete in ${timeout}ms, ${targetProp}: ${getProp(
              response,
              targetProp,
            )}`
          : `[TIMEOUT] Cannot complete in ${timeout}ms`;
        const err: TimeoutError = new Error(errMsg);
        err.response = response;
        reject(err);
      }
      if (targetProp) {
        if (response) {
          const propVal = getProp(response, targetProp);
          if (propVal === targetResponse) {
            resolve(response);
            return;
          } else if (failResponse) {
            if (
              (typeOf(failResponse) === 'Array' &&
                failResponse.indexOf(propVal) !== -1) ||
              propVal === failResponse
            ) {
              const errMsg = `[FAIL] Request fail`;
              const err: TimeoutError = new Error(errMsg);
              err.response = response;
              reject(err);
              return;
            }
          }
        }
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
