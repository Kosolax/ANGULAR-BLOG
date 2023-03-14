import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Pagination } from '../../../model/AdminPagination';
import { LightViewerArticle } from '../../../model/LightViewerArticle';
import { Tag } from '../../../model/Tag';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ArticleService } from '../../../shared/services/article.service';
import { TagService } from '../../../shared/services/tag.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent extends BaseComponent implements OnInit {

  private search: string = "";
  private currentPage: number = 1;
  public tagsId: number[] = [];
  public tags: Tag[] = [];
  public viewerPagination: Pagination<LightViewerArticle> = {} as Pagination<LightViewerArticle>;
  public articles: LightViewerArticle[] = [];
  public tag: string = "";

  constructor(private articleService: ArticleService, private tagService: TagService, private route: ActivatedRoute) {
    super()
  }

  ngOnInit(): void {
    this.tagService.tagsChange.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.tags = value;
      });

    this.articleService.viewerPagination.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.viewerPagination = value;
        this.articles = this.setThumbnail(this.viewerPagination.items);
      });

    this.route.params.subscribe(params => {
      if (params['tag']) {
        this.tag = params['tag'];
      }
    });

    this.tagService.listTags();
    this.setPaginatedArticles();
  }

  setThumbnail(articles: LightViewerArticle[]) {
    if (articles && articles.length > 0) {
      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        for (var j = 0; j < article.images.length; j++) {
          var image = article.images[j];
          if (image.isThumbnail) {
            article.thumbnail = image.base64Image;
          }
        }
      }
    }

    return articles;
  }

  shouldBeChecked(name: string, id: number, currentTag: any) {
    if (this.tag.toLocaleLowerCase() == name) {
      if (!currentTag.checked) {
        this.tagsId.push(id)
        this.setPaginatedArticles();
      }
      return true;
    }

    return false;
  }

  startSearching(searchValue: any) {
    this.search = searchValue.value;
    this.setPaginatedArticles();
  }

  toggleTag(event: any, name: string) {
    if (event.target.checked) {
      this.tagsId.push(event.target.defaultValue);
    }
    else {
      if (name == this.tag) {
        this.tag = "";
      }

      this.tagsId.forEach((item, index) => {
        if (event.target.defaultValue == item) {
          this.tagsId.splice(index, 1);
        }
      });
    }

    this.setPaginatedArticles();
  }

  setPaginatedArticles() {
    this.articleService.paginatedViewerArticles(this.currentPage, this.search, this.tagsId);
  }

  currentPageChange(value: number) {
    this.currentPage = value;
  }
}
