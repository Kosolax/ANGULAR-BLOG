import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { Article } from '../../../../model/Article';
import { Tag } from '../../../../model/Tag';
import { ArticleService } from '../../../../shared/services/article.service';
import { TagService } from '../../../../shared/services/tag.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  article: Article = {} as Article;
  tags: Tag[] = [];
  id: string = "0";
  isRequired = false;
  markdown: string = "";

  private isCreating: boolean = true;

  constructor(private mdService: MarkdownService, private articlesService: ArticleService, private tagsService: TagService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isCreating = true;
    this.id = "0";

    this.articlesService.articleChange
      .subscribe((article) => {
        this.article = article;
        let actualMarkdown = this.article.title + "\n\r" + "![Thumbnail](" + this.article.thumbnail + ")\n\r" + this.article.content;
        this.markdown = this.mdService.parse(actualMarkdown);
      });

    this.tagsService.tagsChange
      .subscribe((value) => {
        this.tags = value;
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.isCreating = false;
        this.articlesService.getArticle(this.id);
      }
      else {
        this.article = {} as Article;
      }
    });

    this.tagsService.listTags();
  }

  toggleTag(event:any) {
    if (this.article.tags == null) {
      this.article.tags = [];
    }

    if (event.target.checked) {
      let tag = this.tags.find(x => x.id == event.target.defaultValue);
      if (tag) {
        this.article.tags.push(tag);
      }
    }
    else {
      this.article.tags.forEach((item, index) => {
        if (event.target.defaultValue == item.id) {
          this.article.tags.splice(index, 1);
        }
      });
    }
  }

  shouldBeChecked(tagId:any) {
    if (this.article.tags != null && this.article.tags.find(x => x.id == tagId)) {
      return true;
    }

    return false;
  }

  onSubmit(form: any) {
    if (this.isValid(form)) {
      if (this.isCreating) {
        this.articlesService.createArticle(this.article);
      }
      else {
        this.articlesService.updateArticle(this.article)
      }
    }
  }

  isValid(form: any) {
    this.isRequired = false;
    if (!this.article.thumbnail) {
      this.isRequired = true;
    }

    return form.valid && this.article.thumbnail;
  }

  uploadFile = (files: any) => {
    const fileToUpload = files[0] as File;
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result != null) {
        this.isRequired = false;
        this.article.thumbnail = reader.result.toString();
      }
    }

    reader.readAsDataURL(fileToUpload);
  }
}
