interface InputObject {
  [propName: string]: any;
}

function getProp(obj: InputObject | null, prop?: string): any {
  if (!prop) {
    return obj;
  }
  let result = obj;
  const propArray: string[] = prop.split('.');
  propArray.forEach((item: string) => {
    if (result) {
      result = result[item];
    }
  });

  return result;
}

export { getProp };
