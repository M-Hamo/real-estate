import { ParamMap } from "@angular/router";

export const ParamsHelper = {
  /** return zero-based index */
  indexPage: (paramMap: ParamMap, key: string = "page"): number => {
    const q = paramMap.get(key);
    return q ? +q : 0;
  },
  indexSize: (paramMap: ParamMap, key: string = "size"): number => {
    const q = paramMap.get(key);
    return q ? +q : 10;
  },
  search: (paramMap: ParamMap, key: string = "search"): string | null => {
    const q = paramMap.get(key);
    return (q && q.trim()) || null;
  },
  array: (paramMap: ParamMap, key: string = "array"): string[] | null => {
    const q = paramMap.getAll(key);
    return JSON.parse(JSON.stringify(q)) || null;
  },

  number: (paramMap: ParamMap, key: string = "number"): number | null => {
    const q = paramMap.get(key);
    return q ? +q : null;
  },
  bool: (paramMap: ParamMap, key: string): boolean | null => {
    const q = paramMap.get(key);
    var isTrueSet = q === "1" ? true : q === "2" ? false : null;
    return isTrueSet;
  },
};
