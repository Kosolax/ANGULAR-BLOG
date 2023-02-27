import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminPagination } from '../../model/AdminPagination';
import { LightAdminArticle } from '../../model/LightAdminArticle';
import { Article } from '../../model/Article';
import { Image } from '../../model/Image';
import { Router } from '@angular/router';
import { ArticlesRoutes } from '../../core/routes/articles.routes'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private deleteChangeSub = new BehaviorSubject<boolean>(false)
  private adminPaginationSub = new BehaviorSubject<AdminPagination<LightAdminArticle>>({} as AdminPagination<LightAdminArticle>)
  private articleChangeSub = new BehaviorSubject<Article>({} as Article)
  private markdownChangeSub = new BehaviorSubject<string>("")

  public deleteChange = this.deleteChangeSub.asObservable();
  public adminPagination = this.adminPaginationSub.asObservable();
  public articleChange = this.articleChangeSub.asObservable();
  public markdownChange = this.markdownChangeSub.asObservable();

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  public generateMarkdown(article: Article) {
    if (!article.images || article.images.length == 0) {
      this.markdownChangeSub.next("");
      return;
    }

    let thumbnail = {} as Image;
    let imagesAsText = "";

    for (var i = 0; i < article.images.length; i++) {
      let image = article.images[i];

      if (!image) {
        continue;
      }

      if (image.isThumbnail) {
        thumbnail = image;
      }
      else {
        imagesAsText = imagesAsText + "[" + image.placeholder + "]:" + image.base64Image + "\n\r";
      }
    }

    let actualMarkdown = article.title + " \n\r ![Thumbnail](" + thumbnail.base64Image + ") \n\r " + article.content + " \n\r " + imagesAsText;
    this.markdownChangeSub.next(actualMarkdown);
  }

  public createArticle = (article: Article) => {
    return this.httpClient.post<Article>(this.baseUrl + ArticlesRoutes.BASE_URL + ArticlesRoutes.CREATE, article)
      .subscribe({
        next: () => {
          this.router.navigate(["/admin/articles"]);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      });
  }

  public updateArticle = (article: Article) => {
    return this.httpClient.put<Article>(this.baseUrl + ArticlesRoutes.BASE_URL + ArticlesRoutes.MODIFY.replace("{0}", article.id.toString()), article)
      .subscribe({
        next: () => {
          this.router.navigate(["/admin/articles"]);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      });
  }

  public deleteArticle = (article: LightAdminArticle) => {
    this.httpClient.delete<Article>(this.baseUrl + ArticlesRoutes.BASE_URL + ArticlesRoutes.DELETE.replace("{0}", article.id.toString()))
      .subscribe({
        next: () => {
          this.deleteChangeSub.next(!this.deleteChangeSub.value);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      });
  }

  public getArticle = (id: string) => {
    return this.httpClient.get<Article>(this.baseUrl + ArticlesRoutes.BASE_URL + ArticlesRoutes.GET.replace("{0}", id))
      .subscribe({
        next: (result) => {
          this.articleChangeSub.next(result);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      })
  }

  public paginatedArticles = (pageNumber: number) => {
    this.httpClient.get<AdminPagination<Article>>(this.baseUrl + ArticlesRoutes.BASE_URL + ArticlesRoutes.PAGINATION.replace("{0}", pageNumber.toString()))
      .subscribe({
        next: (result) => {
          this.adminPaginationSub.next(result);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      });
  }
}
