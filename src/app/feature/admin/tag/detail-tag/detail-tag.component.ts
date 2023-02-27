import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Tag } from '../../../../model/Tag';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { TagService } from '../../../../shared/services/tag.service';

@Component({
  selector: 'app-detail-tag',
  templateUrl: './detail-tag.component.html',
  styleUrls: ['./detail-tag.component.css']
})
export class DetailTagComponent extends BaseComponent implements OnInit {
  tag: Tag = {} as Tag;
  id: string = "0";

  private isCreating: boolean = true;

  constructor(private tagsService: TagService, private route: ActivatedRoute)
  {
      super();
  }

  ngOnInit(): void {
    this.isCreating = true;
    this.id = "0";

    this.tagsService.tagChange.pipe(takeUntil(this.notifier))
      .subscribe((tag) => {
        this.tag = tag;
      });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.isCreating = false;
        this.tagsService.getTag(this.id);
      }
      else {
        this.tag = {} as Tag;
      }
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.isCreating) {
        this.tagsService.createTag(this.tag);
      }
      else {
        this.tagsService.updateTag(this.tag)
      }
    }
  }
}
