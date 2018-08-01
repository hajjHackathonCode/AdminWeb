import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AgmCoreModule} from "@agm/core";
 import { GeoFenceComponent } from './geo-fence/geo-fence.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: 'geo',
    component: GeoFenceComponent,
    data: { title: 'Heroes List' }
  },
  { path: '**', component: GeoFenceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
     GeoFenceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_K2pAouJhBRWILRPKb_qOdapffexnZ-w'
    })

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
