import { Service, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Service()
export class ToastService {
  private toastController = inject(ToastController);

    async present(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
