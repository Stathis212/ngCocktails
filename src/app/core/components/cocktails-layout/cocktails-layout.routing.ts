import { NgModule } from '@angular/core'

import { Route, RouterModule } from '@angular/router'

import { CocktailsLayoutComponent } from './cocktails-layout.component'

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'cocktails',
    pathMatch: 'full',
  },
  {
    path: 'cocktails',
    component: CocktailsLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pages/cocktail-list/cocktail-list.module').then(
            (m) => m.CocktailListModule
          )
      },
      {
        path: ':id',
        loadChildren: () =>
          import('@pages/cocktail-details/cocktail-details.module').then(
            (m) => m.CocktailDetailsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CocktailsLayoutRoutingModule { }
