
import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/login/login.component';
import { CreateAccountComponent } from '../app/create-account/create-account.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { authGuard } from '../app/auth.guard';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: 'profile', component: ProfileComponent }
];
