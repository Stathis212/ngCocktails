import { Component, EventEmitter, Input, Output } from '@angular/core'

import { LocalStorageService } from '@core/services'
import { addBodyClass, removeBodyClass, ThemeOptionsEnum } from '@shared/helpers'

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public activeTheme: string = ThemeOptionsEnum.default;
  private defaultTheme: string = ThemeOptionsEnum.default;
  private darkTheme: string = ThemeOptionsEnum.dark;
  private localStorageThemeKey: string = 'activeTheme';

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.setInitialTheme();
  }

  public switchTheme(): void {
    const currentTheme = this.localStorageService.getData(this.localStorageThemeKey);
    const currentThemeIsDark = currentTheme === this.darkTheme;

    if (currentThemeIsDark) {
      removeBodyClass(currentTheme);
      this.updateLocalStorageTheme(this.localStorageThemeKey, this.defaultTheme);
      this.activeTheme = this.defaultTheme;
    } else {
      addBodyClass(this.darkTheme);
      this.updateLocalStorageTheme(this.localStorageThemeKey, this.darkTheme);
      this.activeTheme = this.darkTheme;
    }
  }

  private setInitialTheme(): void {
    const storageThemeValue = this.localStorageService.getData(this.localStorageThemeKey);

    if (storageThemeValue) {
      addBodyClass(storageThemeValue);
      this.activeTheme = storageThemeValue;
    }
  }

  private updateLocalStorageTheme(key: string, theme: string): void {
    this.localStorageService.saveData(key, theme);
  }
}
