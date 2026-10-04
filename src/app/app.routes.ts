import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '', 
    component: MainLayoutComponent,
    children: 
    [
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
      },
    ]
  }, 
];
