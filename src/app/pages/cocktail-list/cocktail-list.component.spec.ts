import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import {
  ActivatedRouteStub, CocktailListStubService, CocktailsViewMock, StateStubService
} from 'src/app/testing'

import { CocktailListResolver } from '@core/resolvers/cocktail-list.resolver'
import { StateService } from '@core/store/state.service'
import {
  CocktailItemComponent, CocktailSearchComponent, NumberedPaginationComponent
} from '@shared/components'
import { CocktailListService } from '@shared/services'

import { CocktailListComponent } from './cocktail-list.component'

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let resolver: CocktailListResolver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CocktailListComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        NumberedPaginationComponent,
        CocktailItemComponent,
        CocktailSearchComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        { provide: CocktailListService, useClass: CocktailListStubService },
        { provide: StateService, useClass: StateStubService },
        CocktailListResolver
      ]
    })
    .compileComponents();

    resolver = TestBed.inject(CocktailListResolver)
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init', () => {
    const expectToHaveAllCocktails = component.allCocktails.every(element => {
      return CocktailsViewMock.includes(element);
    });

    const expectCategoriesToIncludeDefault = component.categories.find(element => {
      if (element.id === 0 && element.label === 'All') {
        return true;
      }
      return false;
    });

    const expectPaginatedCocktailsToHaveValues = component.paginatedCocktails.length > 0;

    expect(component).toBeTruthy();
    expect(expectToHaveAllCocktails).toBeTruthy();
    expect(expectCategoriesToIncludeDefault).toBeTruthy();
    expect(expectPaginatedCocktailsToHaveValues).toBeTruthy();
    expect(component.filteredCocktails.length).toEqual(0);
  });

  it('should search cocktails', () => {
    const setPageSpy = spyOn<any>(component, 'setPage');
    const filterCocktailsSpy = spyOn<any>(component['cocktailsService'], 'filterCocktails');
    const filtersValue = {
      name: 'B-',
      category: null
    };

    component.searchCocktails(filtersValue);

    expect(setPageSpy).toHaveBeenCalled();
    expect(filterCocktailsSpy).toHaveBeenCalledWith(filtersValue);
  });

  it('should select cocktail', () => {
    const filterCocktailsSpy = spyOn<any>(component['cocktailsService'], 'setActiveCocktailDetails');
    const routerSpy = spyOn<any>(component['router'], 'navigate');

    component.selectCocktail(CocktailsViewMock[0].id);

    expect(filterCocktailsSpy).toHaveBeenCalledWith(CocktailsViewMock[0]);
    expect(routerSpy).toHaveBeenCalledWith([`/cocktails/${CocktailsViewMock[0].id}`]);
  });
});
