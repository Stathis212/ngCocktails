import { Component, OnDestroy, OnInit } from '@angular/core'

import { ActivatedRoute, Router } from '@angular/router'

import { skip, Subscription } from 'rxjs'

import { createCocktailCategories, findCocktailById, sliceArrayIntoChunks } from '@shared/helpers'
import { CocktailFilterFormValue, CocktailViewModel, SelectFieldOption } from '@shared/models'
import { CocktailListService } from '@shared/services'

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit, OnDestroy {

  public allCocktails: CocktailViewModel[] = [];
  public filteredCocktails: CocktailViewModel[] = [];
  public paginatedCocktails: CocktailViewModel[][] = [];
  public categories: SelectFieldOption[] = [];
  public page: number = 1;
  public pageCount: number = 12;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute:ActivatedRoute,
    private cocktailsService: CocktailListService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.allCocktails = this.activatedRoute.snapshot.data['cocktailList'];
    this.setCategories();
    this.filteredCocktails = this.allCocktails;
    this.paginateCocktails(this.filteredCocktails);
    this.subscribeToFilteredResults();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public searchCocktails(filters: CocktailFilterFormValue): void {
    this.setPage(1);
    this.cocktailsService.filterCocktails(filters);
  }

  public selectCocktail(id: string): void {
    const selectedCocktail: CocktailViewModel | null = findCocktailById(this.allCocktails, id);
    this.cocktailsService.setActiveCocktailDetails(selectedCocktail);
    this.router.navigate([`/cocktails/${id}`]);
  }

  public setPage(pageNumber: number): void {
    this.page = pageNumber;
  }

  private setCategories(): void {
    this.categories = createCocktailCategories(this.allCocktails);
  }

  private paginateCocktails(filteredCocktails: CocktailViewModel[]): void {
    this.paginatedCocktails = sliceArrayIntoChunks(filteredCocktails, this.pageCount);
  }

  private subscribeToFilteredResults(): void {
    this.subscriptions.add(
      this.cocktailsService.filteredCocktails$
        .pipe(skip(1))
        .subscribe((filteredCocktails: CocktailViewModel[]) => {
          this.filteredCocktails = filteredCocktails;
          this.paginateCocktails(filteredCocktails);
        })
    );
  }
}
