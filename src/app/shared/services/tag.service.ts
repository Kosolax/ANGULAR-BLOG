import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TagsRoutes } from '../../core/routes/tags.routes';
import { AdminPagination } from '../../model/AdminPagination';
import { Tag } from '../../model/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private deleteChangeSub = new BehaviorSubject<boolean>(false)
  private adminPaginationSub = new BehaviorSubject<AdminPagination<Tag>>({} as AdminPagination<Tag>)
  private tagChangeSub = new BehaviorSubject<Tag>({} as Tag)

  public deleteChange = this.deleteChangeSub.asObservable();
  public adminPagination = this.adminPaginationSub.asObservable();
  public tagChange = this.tagChangeSub.asObservable();

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

  public createTag = (tag: Tag) => {
    return this.httpClient.post<Tag>(this.baseUrl + TagsRoutes.BASE_URL + TagsRoutes.CREATE, tag)
      .subscribe({
        next: () => {
          this.router.navigate(["/admin/tags"]);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      })
  }

  public updateTag = (tag: Tag) => {
    return this.httpClient.put<Tag>(this.baseUrl + TagsRoutes.BASE_URL + TagsRoutes.MODIFY.replace("{0}", tag.id.toString()), tag)
      .subscribe({
        next: () => {
          this.router.navigate(["/admin/tags"]);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      });
  }

  public deleteTag = (tag: Tag) => {
    this.httpClient.delete<Tag>(this.baseUrl + TagsRoutes.BASE_URL + TagsRoutes.DELETE.replace("{0}", tag.id.toString()))
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

  public getTag = (id: string) => {
    return this.httpClient.get<Tag>(this.baseUrl + TagsRoutes.BASE_URL + TagsRoutes.GET.replace("{0}", id))
      .subscribe({
        next: (result) => {
          this.tagChangeSub.next(result);
        },
        error: () => {
          //TODO
          console.log("TODO")
        }
      })
  }

  public listTags = () => {
    return this.httpClient.get<Tag[]>(this.baseUrl + TagsRoutes.BASE_URL + TagsRoutes.LIST);
  }

  public paginatedTags = (pageNumber: number) => {
    this.httpClient.get<AdminPagination<Tag>>(this.baseUrl + TagsRoutes.BASE_URL + TagsRoutes.PAGINATION.replace("{0}", pageNumber.toString()))
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
