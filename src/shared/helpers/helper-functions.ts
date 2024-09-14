/**
 *
 * @param objs May be Reference types or more
 * @description This function responsible for checking the objects enters all are equal
 * @returns Boolean
 */
export const ObjectsEqual = (...objs: any[]): boolean => {
  const convertedObjs: string[] = objs.map((obj) => JSON.stringify(obj));

  return convertedObjs.every((cObj) => cObj === convertedObjs[0]);
};

/**
 *
 * @param value1 Type of any
 * @param value2 Type of any
 * @description This function responsible for checking the equality for tow Items of types any
 * @returns Boolean
 */
export const IsEqual = (value1: any, value2: any): boolean => {
  // Check if the two values are identical
  if (value1 === value2) return true;

  // Check if the two values are both objects or arrays
  if (
    typeof value1 === 'object' &&
    value1 !== null &&
    typeof value2 === 'object' &&
    value2 !== null
  ) {
    // Check if the two values have the same number of keys/elements
    if (
      Object.keys(value1).length !== Object.keys(value2).length ||
      value1.length !== value2.length
    )
      return false;

    // Recursively compare each key/element
    for (const key in value1) {
      if (!IsEqual(value1[key], value2[key])) return false;
    }

    // If all keys/elements are equal, return true
    return true;
  }

  // If the two values are not both objects or arrays, they are not equal
  return false;
};
