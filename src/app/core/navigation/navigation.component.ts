import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Tag } from '../../model/Tag';
import { BaseComponent } from '../../shared/components/base/base.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { TagService } from '../../shared/services/tag.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent extends BaseComponent implements OnInit {
  tags: Tag[] = []
  isMenuCollapsed = true;
  public isAdmin: boolean = false;

  constructor(private authService: AuthenticationService, private tagService: TagService) {
      super();
  }

  ngOnInit(): void {
    this.authService.authChanged.pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.isAdmin = this.authService.isUserAdmin() && this.authService.isUserAuthenticated();
      });

    this.tagService.tagsChange.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.tags = value;
      });

    this.tagService.listTags();
  }
}
