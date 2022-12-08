import { NgModule } from '@angular/core'

import { Route, RouterModule } from '@angular/router'

const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@core/components/cocktails-layout/cocktails-layout.module').then(
        (m) => m.CocktailsLayoutModule
      ),
  },
  {
    path: '**',
    redirectTo: 'whoops'
  },
  {
    path: 'whoops',
    loadComponent: () => import('@pages/not-found/not-found.component').then((c) => c.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
