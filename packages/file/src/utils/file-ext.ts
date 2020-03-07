const fileExt = (filename: string) => {
  const arr = filename.split('.');
  if (arr.length > 0) {
    return arr[arr.length - 1];
  }
  return '';
};

export { fileExt };
