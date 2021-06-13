import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './Service/categories.service';
import { FavoriteGamesService } from './Service/favorite-games.service';
import { GamesProviderService } from './Service/games-provider.service';
import { GamesService } from './Service/games.service';
import { SearchGamesService } from './Service/search-games.service';
import { SlidersService } from './Service/sliders.service';
import { ActivatedRoute } from '@angular/router';
import { CheckSessionService } from './Service/check-session.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  test!:string;
  title = 'game-ui';
  token: any;
  showPopup: boolean = false;
  signature: any;
  showRegisterButton: boolean = true;
  userData: any;
  authenticated: boolean = false;
  sessionID: any;
  name = 'Set iframe source';
  url!: string;
  urlSafe!: SafeResourceUrl;


  constructor(
    private cookieService: CookieService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private checkSession: CheckSessionService,
    private categories: CategoriesService,
    private favoriteGames: FavoriteGamesService,
    private gamesProviders: GamesProviderService,
    private games: GamesService,
    private searchGames: SearchGamesService,
    private sliders: SlidersService,
    private spinner: NgxSpinnerService,
    public sanitizer: DomSanitizer
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    if (this.showPopup == true) {
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
    this.spinner.show();

    this.route.queryParams.subscribe(
      (params) => {
        console.log(params)
        this.token = params.token;
        this.signature = params.signature
        this.test = params.test
      }
    )


    // this.categories.setCategories();
    // this.favoriteGames.setFavoriteGames();
    // this.gamesProviders.setGameProviders();
    // this.games.setGames();
    // this.searchGames.setSearchGames();
    // this.sliders.setSlider();

    setTimeout(() => {
      //   console.log(this.categories.categoriesData)
      //   console.log(this.favoriteGames.favoriteGameData)
      //   console.log(this.gamesProviders.gameProvidersData)
      //   console.log(this.games.gamesData)
      console.log(this.searchGames.searchGamesData)
      //   console.log(this.sliders.sliderData)
    }, 3000);
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      if ((this.token == null || this.token == undefined) && this.test == "testAdmin") {

        this.token = "4679b61a-704f-415b-875a-5dc594aaf3a5";
        this.signature = "0570dbeac0a750ebac44ff7ee72aaaf2";
        this.authenticated = false;

        let tokenSign: any = {};
        tokenSign.token = this.token;
        tokenSign.signature = this.signature;
        tokenSign.sessionID = '_tqoyey9uj';
        tokenSign.authenticated = this.authenticated;
        tokenSign.user = "admin"

        localStorage.setItem('tokenSign', JSON.stringify(tokenSign))
        console.log(localStorage.getItem("tokenSign"));

        let sessionID = '_tqoyey9uj';
        this.checkSession.checkSession(this.sessionID).subscribe(
          data => {
            this.userData = data;
            console.log("*****************")
            console.log(this.userData)
            // alert(data)
          }, (err) => {
            this.authenticated = false
            console.log(err)
            // alert(err)
          }, () => {
            if (this.userData == (null || undefined)) {
              alert('Authentication Error')
            }
          }
        )
      }
      else if (this.token != null || this.token != undefined || this.token != "") {
        this.authenticated = true;
        this.sessionID = this.cookieService.get('gamesessionid');

        let tokenSign: any = {};
        tokenSign.token = this.token;
        tokenSign.signature = this.signature;
        tokenSign.sessionID = this.sessionID;
        tokenSign.authenticated = this.authenticated;

        localStorage.setItem('tokenSign', JSON.stringify(tokenSign))
        console.log(localStorage.getItem("tokenSign"));

        if (this.sessionID == null || this.sessionID == undefined) {
          alert('Authentication Error')
        }
        else {
          this.checkSession.checkSession(this.sessionID).subscribe(
            data => {
              this.userData = data;
              console.log("*****************")
              // console.log(this.userData)
              // alert(this.userData)
            }, (err) => {
              if (this.userData == null || this.userData == undefined || this.sessionID == "") {
                // alert('Authentication Error' + err);
              }
              this.authenticated = false
            }, () => {

            }

          )
        }

      }
      else{
        this.authenticated = false;
      }


      this.spinner.hide();
    }, 5000);
  }
}
