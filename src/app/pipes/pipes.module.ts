import { NgModule } from '@angular/core';
import { TranslatorPipe } from './constant-translator/translator';
import { InputstylePipe } from './inputstyle.pipe';
@NgModule({
   declarations: [
      TranslatorPipe,
      InputstylePipe,
   ],
   imports: [],
   exports: [
      TranslatorPipe,
   ]
})

export class PipesModule {

}
