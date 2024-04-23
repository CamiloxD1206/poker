import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { CreateUserComponent } from './pages/createUser/create-user.component';
import { CreateRoomComponent } from './pages/createRoom/create-room.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  { path: '', component: LoadingComponentComponent, pathMatch:'full'},
  { path: 'roomct', component: CreateRoomComponent },
  { path: 'table/:_id', component: TableComponent },
  { path: 'createUser', component: CreateUserComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
