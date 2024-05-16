import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './createUser/create-user.component';
import { CreateRoomComponent } from './createRoom/create-room.component';
import { AtomicModule } from '../atomicDesign/atomic.module';
import { ComponentsModule } from '../components/components.module';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateUserComponent,
    CreateRoomComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AtomicModule,
    ComponentsModule,
    FormsModule
  ],
  exports: [
    CreateUserComponent,
    CreateRoomComponent,
    TableComponent
  ]
})
export class PagesModule { }
