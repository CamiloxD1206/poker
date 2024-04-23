import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input/input.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    CardComponent

  ]
})
export class AtomsModule { }
