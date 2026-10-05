import { Component, OnInit } from '@angular/core';
import { IonBreadcrumbs } from '@ionic/angular';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  imports: [
    IonBreadcrumbs, 
  ],
})
export class BreadcrumbsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
