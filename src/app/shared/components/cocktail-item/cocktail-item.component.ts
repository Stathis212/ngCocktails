import { Component, EventEmitter, Input, Output } from '@angular/core'

import { CommonModule, NgOptimizedImage } from '@angular/common'

import { CocktailViewModel } from '@shared/models'

@Component({
  selector: '[app-cocktail-item]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.scss']
})
export class CocktailItemComponent {

  @Input() public cocktail: CocktailViewModel | null = null;
  @Output() public selectActiveCocktailId: EventEmitter<string> = new EventEmitter();

  public onSelectCocktail(): void {
    this.selectActiveCocktailId.emit(this.cocktail?.id);
  }
}
