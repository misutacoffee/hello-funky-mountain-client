import { Component, OnInit, input } from '@angular/core';
import { IonBreadcrumbs, IonBreadcrumb } from '@ionic/angular';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  imports: [
    IonBreadcrumbs, IonBreadcrumb
  ],
})
export class BreadcrumbsComponent  implements OnInit {
  breadcrumbs = input<any[]>(['']);
  constructor() { }

  ngOnInit() {}

}
