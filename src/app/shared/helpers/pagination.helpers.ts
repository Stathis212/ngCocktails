export interface NumberedPagination {
  index: number;
  maxPages: number;
  pages: number[];
}

export enum RulerFactoryOption {
  Start = 'START',
  End = 'END',
  Default = 'DEFAULT',
}

export const ruler = (
  currentIndex: number,
  maxPages: number,
  rulerLength: number
): number[] => {
  const array = new Array(rulerLength).fill(null);
  const min = Math.floor(rulerLength / 2);

  return array.map((_, index) =>
    rulerFactory(currentIndex, index, min, maxPages, rulerLength)
  );
};

export const rulerOption = (
  currentIndex: number,
  min: number,
  maxPages: number
): RulerFactoryOption => {
  return currentIndex <= min
    ? RulerFactoryOption.Start
    : currentIndex >= maxPages - min
    ? RulerFactoryOption.End
    : RulerFactoryOption.Default;
};

export const rulerFactory = (
  currentIndex: number,
  index: number,
  min: number,
  maxPages: number,
  rulerLength: number
): number => {
  const factory = {
    [RulerFactoryOption.Start]: () => index + 1,
    [RulerFactoryOption.End]: () => maxPages - rulerLength + index + 1,
    [RulerFactoryOption.Default]: () => currentIndex + index - min,
  };

  return factory[rulerOption(currentIndex, min, maxPages)]();
};

export const allowNavigation = (
  pageNumber: number,
  index: number,
  maxPages: number
): boolean => {
  return pageNumber !== index && pageNumber > 0 && pageNumber <= maxPages;
};
