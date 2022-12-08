import { FormControl } from '@angular/forms'

export interface CocktailListResponse {
  drinks: CocktailResModel[];
}

export enum HasAlcoholEnum {
  hasAlcohol = 'Alcoholic',
  noAlcohol = 'Non alcoholic'
}
export type GlassType = 'Beer mug' | 'Cocktail glass' | 'Coffee mug' | 'Collins Glass' |
  'Highball Glass' | 'Martini Glass' | 'Shot glass' | 'Whiskey sour glass' | 'Wine Glass';

export interface Instruction {
  lang: string;
  text: string | null;
  icon: string;
}

export interface CocktailResModel {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: HasAlcoholEnum;
  strGlass: GlassType;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  "strInstructionsZH-HANS": string | null;
  "strInstructionsZH-HANT": string | null;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: 'Yes' | 'No';
  dateModified: string;
}

export class CocktailViewModel {

  id: string;
  name: string;
  alternateName: string | null;
  category: string | null;
  tags: string[];
  videoUrl: string | null;
  hasAlcohol: boolean;
  glassType: GlassType;
  glassIcon: string;
  instructions: Instruction[];
  thumbnail: string;
  ingredients: string[];
  measures: string[];
  dateModified: string;

  constructor(cocktailRes: CocktailResModel) {
    const ingredients: string[] = [];
    const measures: string[] = [];

    for (let i = 1; i < 16; i++) {
      if ((cocktailRes as any)['strIngredient' + i]) {
        ingredients.push((cocktailRes as any)['strIngredient' + i]);
        measures.push((cocktailRes as any)['strMeasure' + i])
      }
    }

    this.instructions = [];

    this.id = cocktailRes.idDrink;
    this.name = cocktailRes.strDrink,
    this.alternateName = cocktailRes.strDrinkAlternate,
    this.category = cocktailRes.strCategory,
    this.tags = cocktailRes.strTags?.split(',') || [],
    this.videoUrl = '',
    this.hasAlcohol = cocktailRes.strAlcoholic === HasAlcoholEnum.hasAlcohol,
    this.glassType = cocktailRes.strGlass,
    this.glassIcon = 'https://www.thecocktaildb.com/images/ingredients/' + ingredients[0] + '-Small.png',
    cocktailRes.strInstructions ? this.instructions.push({lang: 'English', text: cocktailRes.strInstructions, icon: '/assets/images/icons/english.png'}) : null
    cocktailRes.strInstructionsES ? this.instructions.push({lang: 'Spanish', text: cocktailRes.strInstructionsES, icon: '/assets/images/icons/spanish.png'}) : null
    cocktailRes.strInstructionsDE ? this.instructions.push({lang: 'German', text: cocktailRes.strInstructionsDE, icon: '/assets/images/icons/german.png'}) : null
    cocktailRes.strInstructionsFR ? this.instructions.push({lang: 'French', text: cocktailRes.strInstructionsFR, icon: '/assets/images/icons/french.png'}) : null
    cocktailRes.strInstructionsIT ? this.instructions.push({lang: 'Italian', text: cocktailRes.strInstructionsIT, icon: '/assets/images/icons/italian.png'}) : null
    this.thumbnail = `${cocktailRes.strDrinkThumb}/preview`,
    this.ingredients = ingredients,
    this.measures = measures,
    this.dateModified = cocktailRes.dateModified
  }

  ingredientIcon = (index: number) => 'https://www.thecocktaildb.com/images/ingredients/' + this.ingredients[index] + '-Small.png';
  ingredientImage = (index: number) => 'https://www.thecocktaildb.com/images/ingredients/' + this.ingredients[index] + '.png';

}

export type FilterType = 'name' | 'ingredient' | 'category';

export interface CocktailFilterForm {
  name: FormControl<string>;
  category: FormControl<string | null>;
}

export interface CocktailFilterFormValue { name: string; category: string | null; }
