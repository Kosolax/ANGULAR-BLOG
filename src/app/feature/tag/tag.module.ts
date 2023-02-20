import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { DetailTagComponent } from './detail-tag/detail-tag.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TagsComponent,
    DetailTagComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      { path: 'tag', component: DetailTagComponent },
      { path: 'tag/:id', component: DetailTagComponent },
      { path: '', component: TagsComponent },
    ])
  ]
})
export class TagModule { }
