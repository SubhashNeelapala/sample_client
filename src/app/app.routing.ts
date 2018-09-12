
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
const appRoutes: Routes = [
    {path:'home',component:HomeComponent,children:[
       { path:'registration',component:UserRegistrationComponent}
    ]},
   
    { path: '', component: LoginComponent },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
