import { CocktailViewModel, SelectFieldOption } from '@shared/models'

import { getUniqueValuesFromArray, sortAlphabetically } from './global.helpers'

export const findCocktailById = (list: CocktailViewModel[], id: string): CocktailViewModel | null =>
  list.find((cocktail: CocktailViewModel) => cocktail.id === id) || null;

export const createCocktailCategories = (cocktails: CocktailViewModel[]): SelectFieldOption[] => {
  const uniqueValues = getUniqueValuesFromArray<CocktailViewModel, string>(cocktails, 'category') as string[];
  const sortedValues = uniqueValues.sort(sortAlphabetically);
  const defaultOptions: SelectFieldOption[] = [{
    id: 0,
    value: null,
    label: 'All'
  }];

  const options: SelectFieldOption[] = [...defaultOptions]
    .concat(sortedValues.map((category: string, index: number) => {
      return {
        id: index++,
        value: category,
        label: category
      }
    })
  )

  return options;
}
