import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './feature/home/home.component';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
