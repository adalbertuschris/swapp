import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiClientsModule } from '@api-clients';
import { G11nModule } from '@g11n';
import { HomePageComponent } from './ui/main/pages/home-page/home-page.component';
import { LayoutComponent } from './ui/main/components/layout/layout.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApiClientsModule,
    G11nModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
