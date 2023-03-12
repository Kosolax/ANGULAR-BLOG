import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ArticlesComponent,
    DetailArticleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      { path: 'article/:slug', component: DetailArticleComponent },
      { path: ':tag', component: ArticlesComponent },
      { path: '', component: ArticlesComponent },
    ])
  ]
})
export class ArticleModule { }
