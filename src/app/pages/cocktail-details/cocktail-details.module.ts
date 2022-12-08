import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Route, RouterModule } from '@angular/router'

import { CocktailDetailsResolver } from '@core/resolvers/cocktail-details.resolver'
import { SharedPipesModule } from '@shared/pipes/pipes.module'
import { CocktailDetailsService } from '@shared/services'

import { CocktailDetailsComponent } from './cocktail-details.component'

const routes: Route[] = [
  {
    path: '',
    component: CocktailDetailsComponent,
    resolve: {
      details: CocktailDetailsResolver
    }
  }
];

@NgModule({
  declarations: [
    CocktailDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedPipesModule
  ],
  exports: [
    CocktailDetailsComponent
  ],
  providers: [
    CocktailDetailsService,
    CocktailDetailsResolver
  ]
})
export class CocktailDetailsModule { }
