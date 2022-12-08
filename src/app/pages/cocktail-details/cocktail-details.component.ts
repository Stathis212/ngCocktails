import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'

import { CocktailViewModel, Instruction } from '@shared/models'

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

  public cocktail?: CocktailViewModel;
  public activeInstructions: Instruction | undefined = undefined;
  public instructionsLanguage: string = '';

  constructor( private activatedRoute: ActivatedRoute ) {}

  public ngOnInit(): void {
    this.cocktail = this.activatedRoute.snapshot.data['details'];
    this.activeInstructions = this.cocktail?.instructions[0];
    this.instructionsLanguage = this.activeInstructions?.lang || '';
  }

  public setActiveLanguage(lang: string): void {
    this.activeInstructions = this.cocktail?.instructions.find((instruction: Instruction) => instruction.lang === lang) || undefined;
    this.instructionsLanguage = lang;
  }
}
