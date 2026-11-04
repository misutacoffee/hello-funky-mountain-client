import { Service, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Service()
export class AlertService {
  private alertCtl = inject(AlertController);
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        // 
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        // 
      },
    },
  ];

  async present(header:any = null, message:any = null, options:any = null){
    const alert = await this.alertCtl.create({
      header: header || "Would you like to proceed?",
      subHeader: options?.subHeader || null,
      message: message || "Would you like to proceed?",
      buttons: options?.alertButtons || this.alertButtons,
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }

}
