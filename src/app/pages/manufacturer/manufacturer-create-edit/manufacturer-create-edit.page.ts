import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonGrid, IonRow, IonCol, IonList, IonInput, IonItem, IonNote, IonLabel, IonCheckbox, IonIcon, 
  IonBreadcrumb, IonCard, IonCardContent, IonButtons, IonButton, IonTextarea,
  NavController, 
 } from '@ionic/angular';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manufacturer-create-edit',
  templateUrl: './manufacturer-create-edit.page.html',
  styleUrls: ['./manufacturer-create-edit.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonGrid, IonRow, IonCol, IonList, IonInput, IonItem, IonNote, IonLabel, IonCheckbox, IonIcon, 
    IonBreadcrumb, IonCard, IonCardContent, IonButtons, IonButton, IonTextarea, 
    RouterLink, ReactiveFormsModule, BreadcrumbsComponent, 
  ]
})
export class ManufacturerCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private manufacturerServ = inject(ManufacturerService);
  private toast = inject(ToastService);
  private navCtl = inject(NavController);
  uuid:any;
  manufacturer = signal<any>(null);
  form = computed<any>(() => this.manufacturerServ.buildForm(this.manufacturer()));
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    const manufacturer:any = this.uuid ? await this.manufacturerServ.getByUuid(this.uuid) : this.manufacturerServ.createNew();
    this.manufacturer.set(manufacturer);
  }

  async save(){
    if(this.form()?.valid){
      const manufacturer:any = this.form()?.value;
      const results:any = await this.manufacturerServ.save(manufacturer);
      if(results?.success){
        this.toast.present(results?.message ?? "Manufacturer successfully saved to the database.");
        this.navCtl.back();
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
        this.toast.present("Please complete the form to continue.");
    }
  }

}
