import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Service()
export class NavService {
  private navCtl = inject(NavController);
  private router = inject(Router);

  back(){
    if(window.history.length == 0){
      this.router.navigateByUrl('/');
    }else{
      this.navCtl.back();
    }
  }

}
