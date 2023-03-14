import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Pagination } from '../../../../model/AdminPagination';
import { LightAdminArticle } from '../../../../model/LightAdminArticle';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ArticleService } from '../../../../shared/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent extends BaseComponent implements OnInit {
  public articles: LightAdminArticle[] = [];

  private currentPage: number = 1;
  adminPagination: Pagination<LightAdminArticle> = {} as Pagination<LightAdminArticle>;

  constructor(private articleService: ArticleService)
  {
      super();
  }

  ngOnInit(): void {
    this.articleService.deleteChange.pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.setPaginatedArticles();
      });

    this.articleService.adminPagination.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.adminPagination = value;
        this.articles = this.adminPagination.items;
      });
  }

  currentPageChange(value: number) {
    this.currentPage = value;
  }

  deleteArticle(article: LightAdminArticle) {
    this.articleService.deleteArticle(article);
  }

  setPaginatedArticles() {
    this.articleService.paginatedArticles(this.currentPage);
  }
}
