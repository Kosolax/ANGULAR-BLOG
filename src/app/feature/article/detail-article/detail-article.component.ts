import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { takeUntil } from 'rxjs';
import { Article } from '../../../model/Article';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ArticleService } from '../../../shared/services/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent extends BaseComponent implements OnInit {

  private slug: string = "";
  private article: Article = {} as Article;
  markdown: string = "";

  constructor(private mdService: MarkdownService, private articlesService: ArticleService, private route: ActivatedRoute) {
    super()
  }

  ngOnInit(): void {
    this.articlesService.markdownChange.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.markdown = this.mdService.parse(value);
      });

    this.articlesService.articleChange.pipe(takeUntil(this.notifier))
      .subscribe((article) => {
        this.article = article;
        this.generateMarkdown();
      });

    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.slug = params['slug'];
        this.articlesService.getArticle(this.slug);
      }
    });
  }

  generateMarkdown() {
    this.articlesService.generateMarkdown(this.article);
  }

}
