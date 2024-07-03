import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProfilePageModule } from './profile/profile.module';
import { HttpClientModule } from '@angular/common/http'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DBTaskService } from './services/dbtask.service';
import { ApiService } from './services/api.service'; 

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ProfilePageModule,
    HttpClientModule // Añade esta línea
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    SQLite,
    DBTaskService,
    ApiService // Añade esta línea
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }