import { typeOf } from './type-of';

function deepClone(item: any) {
  if (!item) {
    return item;
  } // null, undefined values check

  const types = [Number, String, Boolean];
  let result: any[] | any;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function(type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeOf(result) === 'Undefined') {
    if (typeOf(item) === 'Array') {
      result = [];
      item.forEach((child: any, index: number) => {
        result[index] = deepClone(child);
      });
    } else if (typeOf(item) === 'Object') {
      if (item.nodeType && typeOf(item.cloneNode) === 'Function') {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};
          for (let i in item) {
            result[i] = deepClone(item[i]);
          }
        }
      } else {
        result = item;
      }
    } else {
      result = item;
    }
  }

  return result;
}

export { deepClone };
