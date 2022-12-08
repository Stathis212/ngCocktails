
import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'

import { StateService } from '@core/store/state.service'
import { CocktailFilterFormValue, CocktailListResponse, CocktailViewModel } from '@shared/models'

import { CocktailsMock } from '../mocks/cocktails.mock'

@Injectable()
export class CocktailListStubService {

  public readonly filteredCocktails$: Observable<CocktailViewModel[]>;

  constructor(
    private state: StateService
  ) {
    this.filteredCocktails$ = this.state.cocktailFilteredListSource;
  }

  public getCocktailsByLetter(letter: string): Observable<CocktailListResponse> {
    const drinks = CocktailsMock.drinks.filter((cocktail) => cocktail.strDrink.startsWith(letter));
    return of({drinks});
  }

  public setActiveCocktailDetails(selectedCocktail: CocktailViewModel | null): void {
    this.state.setCocktailDetails(selectedCocktail);
  }

  public filterCocktails(filters: CocktailFilterFormValue): void {
    this.state.setCocktailFilteredList(filters);
  }

  public setCocktails(cocktails: CocktailViewModel[]): void {
    this.state.setCocktailList(cocktails);
  }
}
