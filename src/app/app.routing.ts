import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForbiddenComponent } from "./core/forbidden/forbidden.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { HomeComponent } from "./feature/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authentication', loadChildren: () => import('./feature/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'admin/tags', loadChildren: () => import('./feature/admin/tag/tag.module').then(m => m.TagModule) },
  { path: 'admin/articles', loadChildren: () => import('./feature/admin/article/article.module').then(m => m.ArticleModule) },
  { path: 'articles', loadChildren: () => import('./feature/article/article.module').then(m => m.ArticleModule) },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'notfound', component: NotFoundComponent },
];

// @dynamic
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
