import { IsEqual, ObjectsEqual } from './helper-functions';

export abstract class GStatic {
  public static isEqual = (value1: any, value2: any): boolean =>
    IsEqual(value1, value2);

  public static objectsEqual = (...objs: any[]): boolean =>
    ObjectsEqual(...objs);

  public static removeDuplicate = <T>(list: T[], param: string = 'id'): T[] => {
    // Sort from length to make biggest objects first Then remove the smaller
    list = list.sort(
      (a: T, b: T) =>
        Object.keys(b as any).length - Object.keys(a as any).length
    );

    const uniqueObjects: T[] = [];

    const uniqueIds = new Set();

    list.forEach((obj) => {
      if (!uniqueIds.has((obj as any)[param])) {
        uniqueIds.add((obj as any)[param]);
        uniqueObjects.push(obj);
      }
    });

    return uniqueObjects;
  };

  public static isEmptyObject = (obj: {}): boolean => {
    for (let name in obj) return false;
    return true;
  };

  public static dynamicNameLength = (itemList: any[]): any[] => {
    return itemList.map((obj: any, index: number) => {
      const dynamicLength: number = itemList.length - index; // Adjust the logic based on your requirements
      obj.name = obj.name.slice(0, dynamicLength);
      return obj;
    });
  };

  public static truncateAndBreak = (str: string, maxLength: number): string => {
    const regex: RegExp = new RegExp(`.{1,${maxLength}}`, 'g');

    const text: string =
      str.substring(0, maxLength) +
      '\n' +
      str.substring(maxLength).match(regex)?.join('\n');

    return text?.replace(/\bundefined\b/g, '');
  };

  public static ipPattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
}
