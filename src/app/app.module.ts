import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './feature/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AboutMeComponent } from './feature/home/about-me/about-me.component';
import { ExperiencesComponent } from './feature/home/experiences/experiences.component';
import { ProjectsComponent } from './feature/home/projects/projects.component';
import { LatestArticlesComponent } from './feature/home/latest-articles/latest-articles.component';
import { SkillsComponent } from './feature/home/skills/skills.component';
import { ContactMeComponent } from './feature/home/contact-me/contact-me.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeComponent,
    ExperiencesComponent,
    ProjectsComponent,
    LatestArticlesComponent,
    SkillsComponent,
    ContactMeComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7232"],
      }
    }),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
