import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './UserComponent/user-list/user-list.component';
import { UserComponent } from './UserComponent/user/user.component';
import { UserModule } from './UserModule/user/user.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseService } from './base.service';
import {HttpClientModule} from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    HttpClientModule
  ],
  providers: [

    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
