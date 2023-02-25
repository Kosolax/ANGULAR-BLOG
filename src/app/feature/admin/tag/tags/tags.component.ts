import { Component, OnInit } from '@angular/core';
import { AdminPagination } from '../../../../model/AdminPagination';
import { Tag } from '../../../../model/Tag';
import { TagService } from '../../../../shared/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public tags: Tag[] = [];

  private currentPage: number = 1;
  adminPagination: AdminPagination<Tag> = {} as AdminPagination<Tag>;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.deleteChange
    .subscribe(() => {
      this.setPaginatedTags();
    });

    this.tagService.adminPagination
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
