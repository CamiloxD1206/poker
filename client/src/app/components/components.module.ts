import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicModule } from '../atomicDesign/atomic.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameTableComponent } from './game-table/game-table.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { LoadingComponentComponent } from './loading-component/loading-component.component';
import { LinkComponent } from './link/link.component';



@NgModule({
  declarations: [
    NavBarComponent,
    GameTableComponent,
    CardsContainerComponent,
    LoadingComponentComponent,
    LinkComponent
  ],
  imports: [
    CommonModule,
    AtomicModule
  ],exports:[
    NavBarComponent,
    GameTableComponent,
    CardsContainerComponent,
    LoadingComponentComponent,
    LinkComponent
  ]
})
export class ComponentsModule { }
