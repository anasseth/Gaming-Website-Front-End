import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../app/Home/home.component';
import { HeaderComponent } from './Layout/header/header.component';
import { SideBarComponent } from './Layout/side-bar/side-bar.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { HorizontalScrollMenuModule } from 'ngx-horizontal-scroll-menu';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HorizontalScrollMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
