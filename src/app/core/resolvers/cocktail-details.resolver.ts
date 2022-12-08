import { Injectable } from '@angular/core'

import { ActivatedRouteSnapshot, Resolve } from '@angular/router'

import { map, Observable, of } from 'rxjs'

import { StateService } from '@core/store/state.service'
import { CocktailListResponse, CocktailViewModel } from '@shared/models'
import { CocktailDetailsService } from '@shared/services'

@Injectable()
export class CocktailDetailsResolver implements Resolve<Observable<CocktailViewModel | null>> {

  constructor(
    private cocktailDetailsService: CocktailDetailsService,
    private state: StateService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<CocktailViewModel | null> {
    const contractId = route.params['id'];
    const dataFromState = this.state.getCocktailDetails();

    return dataFromState
      ? of(dataFromState)
      : this.cocktailDetailsService.getCocktailDetailsById(contractId)
        .pipe(map((cocktailRes: CocktailListResponse) => new CocktailViewModel(cocktailRes.drinks[0])))
  }

}
