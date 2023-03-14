import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Pagination } from '../../../../model/AdminPagination';
import { Tag } from '../../../../model/Tag';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { TagService } from '../../../../shared/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent extends BaseComponent implements OnInit {
  public tags: Tag[] = [];

  private currentPage: number = 1;
  adminPagination: Pagination<Tag> = {} as Pagination<Tag>;

  constructor(private tagService: TagService) {
      super();
  }

  ngOnInit(): void {
    this.tagService.deleteChange.pipe(takeUntil(this.notifier))
    .subscribe(() => {
      this.setPaginatedTags();
    });

    this.tagService.adminPagination.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.adminPagination = value;
        this.tags = this.adminPagination.items;
    });
  }

  currentPageChange(value : number) {
    this.currentPage = value;
  }

  deleteTag(tag: Tag) {
    this.tagService.deleteTag(tag);
  }

  setPaginatedTags() {
    this.tagService.paginatedTags(this.currentPage);
  }
}
