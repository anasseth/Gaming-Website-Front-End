import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
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
// import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './Service/categories.service';
import { FavoriteGamesService } from './Service/favorite-games.service';
import { GamesProviderService } from './Service/games-provider.service';
import { GamesService } from './Service/games.service';
import { SearchGamesService } from './Service/search-games.service';
import { CheckSessionService } from './Service/check-session.service';
import { TranslationModule } from './Translation/translation.module';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LaunchGameService } from './Service/game-launch.service';



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
    TranslationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [LaunchGameService,CookieService, CheckSessionService, CategoriesService, FavoriteGamesService, GamesProviderService, GamesService, SearchGamesService, SlidersService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}