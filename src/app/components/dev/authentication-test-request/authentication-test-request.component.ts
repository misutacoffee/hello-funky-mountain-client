import { Component, OnInit, inject, signal } from '@angular/core';
import { IonButton, IonButtons, IonCard, IonCardContent, IonItem, IonLabel, IonList, IonNote, IonText, IonTitle } from '@ionic/angular';
import { DevService } from '../../../services/dev.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication-test-request',
  templateUrl: './authentication-test-request.component.html',
  styleUrls: ['./authentication-test-request.component.scss'],
  imports: [
    CommonModule, 
    IonCard, IonCardContent, IonList, IonTitle, IonItem, IonButtons, 
    IonButton, IonLabel, IonNote, IonText, 
  ],
})
export class AuthenticationTestRequestComponent  implements OnInit {
  private devServ = inject(DevService);
  results = signal<any>(null);
  constructor() { }

  ngOnInit() {}

  async authenticatedRequest(){
    const results = await this.devServ.authenticatedTestRequest();
    this.results.set(results);
  }

  async unauthenticatedRequest(){
    const results = await this.devServ.unauthenticatedTestRequest();
    this.results.set(results);
  }

}
