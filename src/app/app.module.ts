import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AgmCoreModule} from "@agm/core";
 import { GeoFenceComponent } from './geo-fence/geo-fence.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatNativeDateModule} from "@angular/material";
import { GroupPageComponent } from './group-page/group-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberComponent } from './add-member/add-member.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

const appRoutes: Routes = [
  {
    path: 'geo',
    component: GeoFenceComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    component: GroupPageComponent,
    data: { title: 'Heroes List' }
  }, {
    path: 'members',
    component: AddMemberComponent,
    data: { title: 'Heroes List' }
  },
  { path: '**', component: GroupPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
     GeoFenceComponent,
     GroupPageComponent,
     AddMemberComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatNativeDateModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // ,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD_K2pAouJhBRWILRPKb_qOdapffexnZ-w'
    // })

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
