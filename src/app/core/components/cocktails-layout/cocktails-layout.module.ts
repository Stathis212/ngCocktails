import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { FooterModule } from '../footer/footer.module'
import { HeaderModule } from '../header/header.module'
import { CocktailsLayoutComponent } from './cocktails-layout.component'
import { CocktailsLayoutRoutingModule } from './cocktails-layout.routing'

@NgModule({
  declarations: [
    CocktailsLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CocktailsLayoutRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports: [
    CocktailsLayoutComponent
  ]
})
export class CocktailsLayoutModule { }
