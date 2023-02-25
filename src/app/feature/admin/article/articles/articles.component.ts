import { Component, OnInit } from '@angular/core';
import { AdminPagination } from '../../../../model/AdminPagination';
import { LightAdminArticle } from '../../../../model/LightAdminArticle';
import { ArticleService } from '../../../../shared/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public articles: LightAdminArticle[] = [];

  private currentPage: number = 1;
  adminPagination: AdminPagination<LightAdminArticle> = {} as AdminPagination<LightAdminArticle>;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.deleteChange
      .subscribe(() => {
        this.setPaginatedArticles();
      });

    this.articleService.adminPagination
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
