import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Breadcrumb } from '../../model/Breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly breadcrumbsSub = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs = this.breadcrumbsSub.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        let breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(root, [], breadcrumbs, false);

        this.breadcrumbsSub.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: Breadcrumb[], isLastChild: boolean) {
    if (route) {
      const routeUrl : string[] = parentUrl.concat(route.url.map(url => url.path));
      let newUrl: string = "/";

      if (isLastChild) {
        const breadcrumb = {
          label: "home",
          url: newUrl,
        };

        breadcrumbs.push(breadcrumb);

        routeUrl.forEach(x => {
          newUrl = newUrl + "/" + x

          if (x != "admin") {
            const breadcrumb = {
              label: x,
              url: newUrl,
            };

            breadcrumbs.push(breadcrumb);
          }
        });
      }

      if (route.firstChild && route.firstChild.url.length != 0 && (route.firstChild.firstChild == null || route.firstChild?.firstChild?.url.length == 0)) {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs, true);
      }
      else {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs, false);
      }
    }
  }
}
