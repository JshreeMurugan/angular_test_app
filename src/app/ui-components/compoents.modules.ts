import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';

@NgModule({
  declarations: [
    PrimaryButtonComponent,
    
  ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // ReactiveFormsModule
  ],
  exports: [
    PrimaryButtonComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }
