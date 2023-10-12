import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule]
})
export class ApiClientsModule {
  constructor(@Optional() @SkipSelf() parentModule?: ApiClientsModule) {
    if (parentModule) {
      throw new Error('ApiClientsModule is already loaded. Import it in the AppModule only');
    }
  }
}
