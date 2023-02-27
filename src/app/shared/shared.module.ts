import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { JoinPipe } from './pipes/join.pipe';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [
    PaginationComponent,
    BreadcrumbComponent,
    JoinPipe,
    BaseComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    PaginationComponent,
    BreadcrumbComponent,
    JoinPipe,
  ],
  providers: []
})
export class SharedModule { }
