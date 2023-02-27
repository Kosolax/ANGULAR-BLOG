import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation/navigation.component";
import { FooterComponent } from './footer/footer.component';
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedModule } from "../shared/shared.module";
import { MarkdownModule } from "ngx-markdown";

@NgModule({
  imports: [
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  declarations: [
    NavigationComponent,
    FooterComponent,
    ForbiddenComponent,
    NotFoundComponent,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    ForbiddenComponent,
    NotFoundComponent,
    MarkdownModule
  ],
  providers: []
})
export class CoreModule {
  constructor() {
  }
}
