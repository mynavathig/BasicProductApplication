import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { NoAuthGuard } from './_helpers/noAuth.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    // canLoad: [NoAuthGuard],
    // canActivate: [NoAuthGuard] 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    // canLoad: [NoAuthGuard],
    // canActivate: [NoAuthGuard] 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}