import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { CocktailsLayoutModule, FooterModule, HeaderModule, LoaderModule } from '@core/components'
import { ErrorInterceptor, LoaderInterceptor } from '@core/interceptors'
import { LoaderService, LocalStorageService } from '@core/services'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    LoaderModule,
    CocktailsLayoutModule,
    HeaderModule,
    FooterModule
  ],
  exports: [
    LoaderModule,
    HeaderModule,
    FooterModule
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    LocalStorageService
  ]
})
export class CoreModule {}

