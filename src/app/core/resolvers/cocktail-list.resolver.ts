import { Injectable } from '@angular/core'

import { Resolve } from '@angular/router'

import { forkJoin, map, Observable, of, take } from 'rxjs'

import { StateService } from '@core/store/state.service'
import { CocktailListResponse, CocktailResModel, CocktailViewModel } from '@shared/models'
import { CocktailListService } from '@shared/services'

@Injectable()
export class CocktailListResolver implements Resolve<Observable<any>> {

  constructor(
    private cocktailListService: CocktailListService,
    private state: StateService
  ) {}

  public resolve(): Observable<any> {
    const dataFromState = this.state.getCocktailList();
    if (!!dataFromState?.length) {
      return of(dataFromState);
    }

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const requests: Observable<CocktailListResponse>[] = alphabet.map(
      (letter: string) => this.cocktailListService.getCocktailsByLetter(letter)
    );

    const cocktailsData =  forkJoin(requests).pipe(
      map((responses: CocktailListResponse[]) => responses.map(response => response.drinks)),
      map((responses: CocktailResModel[][]) => responses.flat()),
      map((finalResponse: CocktailResModel[]) => {
        const nonEmptyResults = finalResponse.filter((t) => t && t.idDrink)
        return nonEmptyResults.map((drink: CocktailResModel) => new CocktailViewModel(drink)).sort(() => 0.5 - Math.random())
      })
    );

    cocktailsData.pipe(take(1)).subscribe((cocktails) => this.state.setCocktailList(cocktails))

    return cocktailsData;
  }
}
