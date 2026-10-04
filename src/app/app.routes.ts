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
      {
        path: 'equipment', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/equipment/equipment-index/equipment-index.page').then( m => m.EquipmentIndexPage)
          }, 
          {
            path: 'create',
            loadComponent: () => import('./pages/equipment/equipment-create-edit/equipment-create-edit.page').then( m => m.EquipmentCreateEditPage)
          }, 
          {
            path: ':uuid',
            loadComponent: () => import('./pages/equipment/equipment-show/equipment-show.page').then( m => m.EquipmentShowPage)
          }, 
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/equipment/equipment-create-edit/equipment-create-edit.page').then( m => m.EquipmentCreateEditPage)
          },
        ]
      }, 
    ]
  }, 
];
