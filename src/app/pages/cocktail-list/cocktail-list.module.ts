import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Route, RouterModule } from '@angular/router'

import { CocktailListResolver } from '@core/resolvers/cocktail-list.resolver'
import {
  CocktailItemComponent, CocktailSearchComponent, NumberedPaginationComponent
} from '@shared/components'
import { CocktailListService } from '@shared/services'

import { CocktailListComponent } from './cocktail-list.component'

const routes: Route[] = [
  {
    path: '',
    component: CocktailListComponent,
    resolve: {
      cocktailList: CocktailListResolver
    }
  }
];

@NgModule({
  declarations: [
    CocktailListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NumberedPaginationComponent,
    CocktailItemComponent,
    CocktailSearchComponent
  ],
  exports: [
    CocktailListComponent
  ],
  providers: [
    CocktailListService,
    CocktailListResolver
  ]
})
export class CocktailListModule { }
