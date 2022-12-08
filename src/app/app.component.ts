import { Component } from '@angular/core'

import { Observable, of } from 'rxjs'

import { LoaderService } from '@core/services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public showLoader$: Observable<boolean> = of(false);

  constructor(
    private loaderService: LoaderService
  ) {  }

  public ngOnInit(): void {
    setTimeout(() => this.showLoader$ = this.loaderService.isLoaderVisible$);
  }
}
