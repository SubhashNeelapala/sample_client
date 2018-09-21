import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { JhpHeadersService } from './provider/provider.component';
import { ApiservicesService } from './provider/apiservices.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRegistrationComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DataTablesModule,
    NgIdleKeepaliveModule.forRoot()
    ],
  providers: [JhpHeadersService,ApiservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
