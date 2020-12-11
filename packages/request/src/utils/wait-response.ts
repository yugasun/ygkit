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
}

async function waitResponse({
  callback,
  targetProp,
  targetResponse,
  failResponse,
  timeout,
  loopGap = 1000,
}: WaitResponseOptions): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let times = Math.ceil(timeout / loopGap);
      while (times > 0) {
        const response = await callback();
        if (targetProp) {
          const propVal = getProp(response, targetProp);
          if (
            (typeOf(failResponse) === 'Array' &&
              failResponse.indexOf(propVal) !== -1) ||
            propVal === failResponse
          ) {
            const errMsg = `[FAIL] Request fail`;
            const err: TimeoutError = new Error(errMsg);
            err.response = response;
            reject(err);
            break;
          }
          if (propVal === targetResponse) {
            resolve(response);
            break;
          }
          await sleep(loopGap);
          times--;
        } else {
          if (response === targetResponse) {
            resolve(response);
            break;
          } else {
            await sleep(loopGap);
            times--;
          }
        }
      }

      const res = await callback();
      // timeout
      const errMsg = targetProp
        ? `[TIMEOUT] Cannot complete in ${timeout}ms, ${targetProp}: ${getProp(
            res,
            targetProp,
          )}`
        : `[TIMEOUT] Cannot complete in ${timeout}ms`;
      const err: TimeoutError = new Error(errMsg);
      err.response = res;
      reject(err);
    } catch (e) {
      reject(e);
    }
  });
}

export { waitResponse };
