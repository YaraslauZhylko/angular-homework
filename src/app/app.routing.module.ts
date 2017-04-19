import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards';
import { AboutComponent, LoginComponent, PageNotFoundComponent } from './components';

export const appRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export let RouterComponents = [
  AboutComponent,
  LoginComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule {}
