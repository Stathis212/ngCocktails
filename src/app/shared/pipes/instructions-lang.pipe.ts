import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'instructionsLang'
})
export class InstructionsLangPipe implements PipeTransform {

  public transform(lang: string): any {

    let instructionsTitle = '';

    switch(lang) {
      case 'Spanish':
        instructionsTitle = 'INSTRUCCIONES';
        break;
      case 'German':
        instructionsTitle = 'ANWEISUNGEN';
        break;
      case 'French':
        instructionsTitle = 'DES INSTRUCTIONS';
        break;
      case 'Italian':
        instructionsTitle = 'ISTRUZIONI';
        break;
      default:
        instructionsTitle = 'INSTRUCTIONS';
    }

    return instructionsTitle;
  }

}
