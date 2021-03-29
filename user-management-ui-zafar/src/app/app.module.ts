import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { UserService } from './user.service';
import { AppErrorHandler } from './common/app-error-handler';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
//import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
//import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    AddUserComponent,
    UsersComponent,
    EditUserComponent,
    PageNotFoundComponent,
    HomeComponent,
    ConfirmDialogComponent
    //ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatComponentsModule
    //ConfirmDialogModule
  ],
  providers: [
    UserService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent],
  entryComponents:[UsersComponent, ConfirmDialogComponent]
})
export class AppModule { }
