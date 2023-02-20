import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminPagination } from '../../../model/AdminPagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> implements OnInit {
  currentPage: number = 1;
  totalPages: number = 1;

  @Output() currentPageChange = new EventEmitter();

  //Admin Pagination
  private _adminPagination: AdminPagination<T> = {} as AdminPagination<T>;

  @Input() set adminPagination(value: AdminPagination<T>) {
    this._adminPagination = value;
    this.totalPages = this.adminPagination.totalPages;
    this.currentPage = this.adminPagination.currentPage;
  }

  get adminPagination(): AdminPagination<T> {
    return this._adminPagination;
  }

  constructor() { }

  ngOnInit(): void {
  }

  previous() {
    if (this.currentPage == 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.emitCurrentPageNewValue();
  }

  next() {
    this.currentPage = this.currentPage + 1;
    this.emitCurrentPageNewValue();
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.emitCurrentPageNewValue();
  }

  emitCurrentPageNewValue() {
    this.currentPageChange.emit(this.currentPage);
  }
}
