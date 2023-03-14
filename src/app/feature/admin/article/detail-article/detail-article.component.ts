import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { Article } from '../../../../model/Article';
import { Tag } from '../../../../model/Tag';
import { Image } from '../../../../model/Image';
import { ArticleService } from '../../../../shared/services/article.service';
import { TagService } from '../../../../shared/services/tag.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent extends BaseComponent implements OnInit {

  article: Article = { } as Article;
  tags: Tag[] = [];
  id: string = "0";
  isRequired = false;
  markdown: string = "";

  private isCreating: boolean = true;

  constructor(private mdService: MarkdownService, private articlesService: ArticleService, private tagsService: TagService, private route: ActivatedRoute)
  {
      super();
  }

  ngOnInit(): void {
    this.isCreating = true;
    this.id = "0";

    if (this.article && (!this.article.images || this.article.images.length == 0)) {
      this.article.images = [];
    }

    this.articlesService.markdownChange.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.markdown = this.mdService.parse(value);
      });

    this.articlesService.articleChange.pipe(takeUntil(this.notifier))
      .subscribe((article) => {
        this.article = article;
        this.generateMarkdown();
      });

    this.tagsService.tagsChange.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.tags = value;
      });

    this.tagsService.listTags();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.isCreating = false;
        this.articlesService.getArticle(this.id);
      }
      else {
        this.article = {} as Article;
        this.article.images = [];
      }
    });
  }

  addImage() {
    let image = {} as Image;
    image.placeholder = "Image" + this.article.images.length;
    this.article.images.push(image);
  }

  deleteImage(index: number) {
    this.article.images.splice(index, 1);
  }

  generateMarkdown() {
    this.articlesService.generateMarkdown(this.article);
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
    return form.valid;
  }

  uploadFile = (files: any, index: number) => {
    const fileToUpload = files[0] as File;
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result != null) {
        this.isRequired = false;
        this.article.images[index].base64Image = reader.result.toString();
      }
    }

    reader.readAsDataURL(fileToUpload);
  }
}
