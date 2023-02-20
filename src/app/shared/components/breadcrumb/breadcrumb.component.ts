import { Component } from '@angular/core';
import { Breadcrumb } from '../../../model/Breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  breadcrumbs: Breadcrumb[] = [];

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.breadcrumbs.subscribe((value) => {
      this.breadcrumbs = value;
    });
  }

}
