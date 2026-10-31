import { Service, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Service()
export class ToastService {
  private toastController = inject(ToastController);

    async present(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
