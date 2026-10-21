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
      {
        path: 'manufacturers', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/manufacturer/manufacturer-index/manufacturer-index.page').then( m => m.ManufacturerIndexPage)
          }, 
          {
            path: 'create',
            loadComponent: () => import('./pages/manufacturer/manufacturer-create-edit/manufacturer-create-edit.page').then( m => m.ManufacturerCreateEditPage)
          }, 
          {
            path: ':uuid',
            loadComponent: () => import('./pages/manufacturer/manufacturer-show/manufacturer-show.page').then( m => m.ManufacturerShowPage)
          }, 
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/manufacturer/manufacturer-create-edit/manufacturer-create-edit.page').then( m => m.ManufacturerCreateEditPage)
          },
        ]
      }, 
      {
        path: 'models', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/model/model-index/model-index.page').then( m => m.ModelIndexPage)
          }, 
          {
            path: 'create',
            loadComponent: () => import('./pages/model/model-create-edit/model-create-edit.page').then( m => m.ModelCreateEditPage)
          }, 
          {
            path: ':uuid',
            loadComponent: () => import('./pages/model/model-show/model-show.page').then( m => m.ModelShowPage)
          }, 
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/model/model-create-edit/model-create-edit.page').then( m => m.ModelCreateEditPage)
          },
        ]
      }, 
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
      },
    ]
  },
];
