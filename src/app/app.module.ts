import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../app/Home/home.component';
import { HeaderComponent } from './Layout/header/header.component';
import { SideBarComponent } from './Layout/side-bar/side-bar.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { MaterialModule } from './Material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SlidersService } from './Service/sliders.service'
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './Service/categories.service';
import { FavoriteGamesService } from './Service/favorite-games.service';
import { GamesProviderService } from './Service/games-provider.service';
import { GamesService } from './Service/games.service';
import { SearchGamesService } from './Service/search-games.service';


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
    NgbModule,
    HttpClientModule
  ],
  providers: [CategoriesService, FavoriteGamesService, GamesProviderService, GamesService, SearchGamesService, SlidersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
