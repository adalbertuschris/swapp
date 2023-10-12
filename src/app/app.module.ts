import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiClientsModule } from '@api-clients';
import { G11nModule } from '@g11n';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ApiClientsModule, G11nModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
