import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

// Lazy load standalone AdminComponent
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
];
