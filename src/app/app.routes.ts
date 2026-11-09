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
        path: 'contracts', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/contract/contract-index/contract-index.page').then( m => m.ContractIndexPage)
          }, 
          {
            path: 'create',
            loadComponent: () => import('./pages/contract/contract-create-edit/contract-create-edit.page').then( m => m.ContractCreateEditPage)
          }, 
          {
            path: ':uuid',
            loadComponent: () => import('./pages/contract/contract-show/contract-show.page').then( m => m.ContractShowPage)
          }, 
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/contract/contract-create-edit/contract-create-edit.page').then( m => m.ContractCreateEditPage)
          },
          {
            path: ':contract_uuid/invoices',
            loadComponent: () => import('./pages/invoice/invoice-index/invoice-index.page').then( m => m.InvoiceIndexPage)
          },
          {
            path: ':contract_uuid/invoices/create',
            loadComponent: () => import('./pages/invoice/invoice-create-edit/invoice-create-edit.page').then( m => m.InvoiceCreateEditPage)
          }, 
          {
            path: ':contract_uuid/rentals',
            loadComponent: () => import('./pages/rental/rental-index/rental-index.page').then( m => m.RentalIndexPage)
          },
          // {
          //   path: ':contract_uuid/rentals/:rental_uuid/invoices/create', 
          //   loadComponent: () => import('./pages/invoice/invoice-create-edit/invoice-create-edit.page').then( m => m.InvoiceCreateEditPage)
          // }, 
          {
            path: ':contract_uuid/rentals/create',
            loadComponent: () => import('./pages/rental/rental-create-edit/rental-create-edit.page').then( m => m.RentalCreateEditPage)
          },
        ]
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
        path: 'invoices', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/invoice/invoice-index/invoice-index.page').then( m => m.InvoiceIndexPage)
          }, 
          {
            path: 'create',
            loadComponent: () => import('./pages/invoice/invoice-create-edit/invoice-create-edit.page').then( m => m.InvoiceCreateEditPage)
          }, 
          {
            path: ':uuid',
            loadComponent: () => import('./pages/invoice/invoice-show/invoice-show.page').then( m => m.InvoiceShowPage)
          }, 
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/invoice/invoice-create-edit/invoice-create-edit.page').then( m => m.InvoiceCreateEditPage)
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
          {
            path: ':manufacturer_uuid/models',
            loadComponent: () => import('./pages/model/model-index/model-index.page').then( m => m.ModelIndexPage)
          },
          {
            path: ':manufacturer_uuid/models/create',
            loadComponent: () => import('./pages/model/model-create-edit/model-create-edit.page').then( m => m.ModelCreateEditPage)
          },
          {
            path: ':manufacturer_uuid/models/:uuid',
            loadComponent: () => import('./pages/model/model-show/model-show.page').then( m => m.ModelShowPage)
          },
          {
            path: ':manufacturer_uuid/models/:uuid/edit',
            loadComponent: () => import('./pages/model/model-create-edit/model-create-edit.page').then( m => m.ModelCreateEditPage)
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
        path: 'rental-equipment', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/rental-equipment/rental-equipment-index/rental-equipment-index.page').then( m => m.RentalEquipmentIndexPage)
          },
          {
            path: 'create',
            loadComponent: () => import('./pages/rental-equipment/rental-equipment-create-edit/rental-equipment-create-edit.page').then( m => m.RentalEquipmentCreateEditPage)
          },
          {
            path: ':uuid',
            loadComponent: () => import('./pages/rental-equipment/rental-equipment-show/rental-equipment-show.page').then( m => m.RentalEquipmentShowPage)
          },
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/rental-equipment/rental-equipment-create-edit/rental-equipment-create-edit.page').then( m => m.RentalEquipmentCreateEditPage)
          },
        ]
      }, 
      {
        path: 'rentals', 
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/rental/rental-index/rental-index.page').then( m => m.RentalIndexPage)
          }, 
          {
            path: 'create',
            loadComponent: () => import('./pages/rental/rental-create-edit/rental-create-edit.page').then( m => m.RentalCreateEditPage)
          }, 
          {
            path: ':uuid',
            loadComponent: () => import('./pages/rental/rental-show/rental-show.page').then( m => m.RentalShowPage)
          }, 
          {
            path: ':uuid/edit',
            loadComponent: () => import('./pages/rental/rental-create-edit/rental-create-edit.page').then( m => m.RentalCreateEditPage)
          },
          {
            path: ':rental_uuid/invoices',
            loadComponent: () => import('./pages/invoice/invoice-index/invoice-index.page').then( m => m.InvoiceIndexPage)
          },
          {
            path: ':rental_uuid/invoices/create',
            loadComponent: () => import('./pages/invoice/invoice-create-edit/invoice-create-edit.page').then( m => m.InvoiceCreateEditPage)
          }, 
        ]
      }, 
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
      },
    ]
  },
  {
    path: 'notification-index',
    loadComponent: () => import('./pages/notification/notification-index/notification-index.page').then( m => m.NotificationIndexPage)
  },
  {
    path: 'notification-show',
    loadComponent: () => import('./pages/notification/notification-show/notification-show.page').then( m => m.NotificationShowPage)
  },
  {
    path: 'message-index',
    loadComponent: () => import('./pages/message/message-index/message-index.page').then( m => m.MessageIndexPage)
  },
  {
    path: 'message-show',
    loadComponent: () => import('./pages/message/message-show/message-show.page').then( m => m.MessageShowPage)
  },
  {
    path: 'message-create-edit',
    loadComponent: () => import('./pages/message/message-create-edit/message-create-edit.page').then( m => m.MessageCreateEditPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'password-reset',
    loadComponent: () => import('./pages/password-reset/password-reset.page').then( m => m.PasswordResetPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },
  {
    path: 'email-verification',
    loadComponent: () => import('./pages/auth/email-verification/email-verification.page').then( m => m.EmailVerificationPage)
  },
  {
    path: 'email/verify/:id/:hash',
    loadComponent: () => import('./pages/auth/verify-email/verify-email.page').then( m => m.VerifyEmailPage)
  },
  {
    path: 'registration-successful',
    loadComponent: () => import('./pages/auth/registration-successful/registration-successful.page').then( m => m.RegistrationSuccessfulPage)
  },
];
