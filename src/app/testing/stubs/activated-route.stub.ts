import { ActivatedRouteSnapshot, Data } from '@angular/router'

import { of } from 'rxjs'

import { CocktailsViewMock } from '../mocks/cocktails.mock'

const data: Data = {
  cocktailList: CocktailsViewMock,
  details: CocktailsViewMock[0]
};

const parent: Partial<ActivatedRouteSnapshot> | null = {
  params: {
    id: 1
  }
};

export const ActivatedRouteStub = {
  queryParams: of({}),
  snapshot: {
    data,
    parent
  }
};
