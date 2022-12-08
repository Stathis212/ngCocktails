export const APIUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1';

export enum ThemeOptionsEnum {
  default = '',
  dark = 'theme-dark'
}

export const addBodyClass = (theme: string): void => {
  const bodyElement = document.body;

  if (!bodyElement) {
    return;
  }
  bodyElement.classList.add(theme);
}

export const removeBodyClass = (theme: string): void => {
  const bodyElement = document.body;

  if (!bodyElement) {
    return;
  }
  bodyElement.classList.remove(theme);
}

export const sliceArrayIntoChunks = (arr: any[], chunkSize: number): any[][] => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export function getUniqueValuesFromArray<T, R>(array: T[], property: string): R[] {
  const uniqueValues: (T[keyof T] | null)[] = [...new Set(array.map((item: T) => item[property as keyof T] || null))];
  const uniqueNonNullValues: (T[keyof T] | null)[] = uniqueValues.filter((value) => (typeof value === 'string') && value);
  return uniqueNonNullValues as R[];
}

export const sortAlphabetically = (a: string, b: string): number => {
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
}
