import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Breadcrumb } from '../../../model/Breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent extends BaseComponent {

  breadcrumbs: Breadcrumb[] = [];

  constructor(private readonly breadcrumbService: BreadcrumbService) {
      super();
    this.breadcrumbService.breadcrumbs.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.breadcrumbs = value;
    });
  }
}
