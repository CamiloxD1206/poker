import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from './atoms/atoms.module';

@NgModule({
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    AtomsModule
  ]
})
export class AtomicModule { }
