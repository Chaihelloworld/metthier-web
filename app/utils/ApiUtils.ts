type AnyObject = Record<string, unknown>;

const replaceEmptyToNull = <T extends AnyObject>(obj: T): T => {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] === '' || result[key] === undefined) {
      (result as AnyObject)[key] = null;
    }
  }
  return result;
};

const replaceNullToEmpty = <T extends AnyObject>(obj: T): T => {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] === null || result[key] === undefined) {
      (result as AnyObject)[key] = '';
    }
  }
  return result;
};

const ApiUtils = {
  replaceEmptyToNull,
  replaceNullToEmpty,
};

export default ApiUtils;
