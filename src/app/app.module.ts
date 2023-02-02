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

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
        allowedDomains: ["localhost:4200"],
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
