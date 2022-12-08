import { NgModule } from '@angular/core'

import { InstructionsLangPipe } from './instructions-lang.pipe'

@NgModule({
  declarations: [
    InstructionsLangPipe
  ],
  exports: [
    InstructionsLangPipe
  ]
})
export class SharedPipesModule {}
