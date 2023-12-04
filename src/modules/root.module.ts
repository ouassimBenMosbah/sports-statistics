import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootRoutingModule } from './root-routing.module';
import { AppComponent } from './root/components/app/app.component';
import { HeaderComponent } from './root/components/header/header.component';
import { HomePageComponent } from './root/components/home-page/home-page.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    RootRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HeaderComponent,
    HttpClientModule,
    MatCardModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class RootModule {}
