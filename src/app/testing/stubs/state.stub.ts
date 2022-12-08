import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs'

import { CocktailFilterFormValue, CocktailViewModel } from '@shared/models'

@Injectable()
export class StateStubService {

  public readonly cocktailFilteredListSource: Observable<CocktailViewModel[]>;

  private readonly _cocktailListSource: BehaviorSubject<CocktailViewModel[]> = new BehaviorSubject<CocktailViewModel[]>([]);
  private readonly _cocktailFilteredListSource: BehaviorSubject<CocktailViewModel[]> = new BehaviorSubject<CocktailViewModel[]>([]);
  private readonly  _cocktailDetailsSource: BehaviorSubject<CocktailViewModel | null> = new BehaviorSubject<CocktailViewModel | null>(null);

  constructor() {
    this.cocktailFilteredListSource = this._cocktailFilteredListSource.asObservable();
  }

  public setCocktailList(data: CocktailViewModel[]): void {
    this._cocktailListSource.next(data);
  }

  public getCocktailList(): CocktailViewModel[]{
    return this._cocktailListSource.getValue();
  }

  public setCocktailDetails(data: CocktailViewModel | null): void {
    this._cocktailDetailsSource.next(data);
  }

  public getCocktailDetails(): CocktailViewModel | null {
    return this._cocktailDetailsSource.getValue();
  }

  public setCocktailFilteredList(filters: CocktailFilterFormValue): void {
    const allCocktails = this.getCocktailList();
    const filteredCocktails = allCocktails.filter((cocktail) =>
      (filters.name.length > 0 ? cocktail.name.toLowerCase()?.includes(filters.name.toLowerCase()) : true)
      && (filters.category ? cocktail.category === filters.category : true));
    this._cocktailFilteredListSource.next(filteredCocktails);
  }

  public getCocktailFilteredList(): CocktailViewModel[] {
    return this._cocktailFilteredListSource.getValue();
  }
}
