import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path : '', 
    component : UsersComponent
  },
  {
    path : 'users', 
    component : UsersComponent
  },
  {
    path : 'users/new', 
    component : AddUserComponent
  },
  {
    path : 'users/:id', 
    component : EditUserComponent
  },
  {
    path : "**", 
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  UsersComponent,
  AddUserComponent,
  EditUserComponent,
  PageNotFoundComponent
];
