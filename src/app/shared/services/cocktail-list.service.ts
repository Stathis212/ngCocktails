import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { StateService } from '@core/store/state.service'
import { APIUrl } from '@shared/helpers'
import {
  CocktailFilterFormValue, CocktailListResponse, CocktailViewModel
} from '@shared/models/cocktail.model'

@Injectable()
export class CocktailListService {

  public readonly filteredCocktails$: Observable<CocktailViewModel[]>;

  constructor(
    private http: HttpClient,
    private state: StateService
  ) {
    this.filteredCocktails$ = this.state.cocktailFilteredListSource;
  }

  public getCocktailsByLetter(letter: string): Observable<CocktailListResponse> {
    return this.http.get<CocktailListResponse>(`${APIUrl}/search.php?f=${letter}`);
  }

  public setActiveCocktailDetails(selectedCocktail: CocktailViewModel | null): void {
    this.state.setCocktailDetails(selectedCocktail);
  }

  public filterCocktails(filters: CocktailFilterFormValue): void {
    this.state.setCocktailFilteredList(filters);
  }
}
