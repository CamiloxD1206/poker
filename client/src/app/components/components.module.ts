import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicModule } from '../atomicDesign/atomic.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameTableComponent } from './game-table/game-table.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { LoadingComponentComponent } from './loading-component/loading-component.component';
import { LinkComponent } from './link/link.component';
import { UserListComponent } from './user-list/user-list.component';
import { ModeComponent } from './mode/mode.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    GameTableComponent,
    CardsContainerComponent,
    LoadingComponentComponent,
    LinkComponent,
    UserListComponent,
    ModeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AtomicModule,
    ReactiveFormsModule,
  ],exports:[
    NavBarComponent,
    GameTableComponent,
    CardsContainerComponent,
    LoadingComponentComponent,
    LinkComponent,
    UserListComponent,
    ModeComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
