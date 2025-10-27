import { Routes } from '@angular/router';
import { LoginComponent } from './shared/auth/login.component/login.component';
import { HomeComponent } from './home.component';
import { AdminComponent } from './admin/admin.component/admin.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { adminGuard } from './admin/admin.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, adminGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', redirectTo: 'home' },
]