import { Component, OnInit } from '@angular/core';
import { SearchGamesService } from './Service/search-games.service';
import { ActivatedRoute } from '@angular/router';
import { CheckSessionService } from './Service/check-session.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LaunchGameService } from './Service/game-launch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  test!: string;
  title = 'game-ui';
  token: any;
  showPopup: boolean = false;
  signature: any;
  showRegisterButton: boolean = true;
  userData: any;
  authenticated: boolean = false;
  sessionID: any;
  language: string = "en";


  constructor(
    private cookieService: CookieService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private checkSession: CheckSessionService,
    private searchGames: SearchGamesService,
    private spinner: NgxSpinnerService,
    // public sanitizer: DomSanitizer,
    public launch: LaunchGameService
  ) {
    translate.setDefaultLang(this.language);

  }

  ngOnInit() {
    // localStorage.removeItem('tokenSign')

    this.spinner.show();

    this.route.queryParams.subscribe(
      (params) => {
        console.log(params)
        this.token = params.token;
        this.signature = params.signature
        this.test = params.test
        if (params.lang != undefined || params.lang != null || params.lang != "") {
          this.language = params.lang;
          this.translate.setDefaultLang("en")
        }
      }
    )

    setTimeout(() => {
      console.log(this.searchGames.searchGamesData)
    }, 3000);

    setTimeout(() => {
      if ((this.token == null || this.token == undefined) && this.test == "testAdmin") {

        this.token = "4679b61a-704f-415b-875a-5dc594aaf3a5";
        this.signature = "0570dbeac0a750ebac44ff7ee72aaaf2";
        this.authenticated = true;

        let tokenSign: any = {};
        tokenSign.token = this.token;
        tokenSign.signature = this.signature;
        tokenSign.sessionID = '_tqoyey9uj';
        tokenSign.authenticated = this.authenticated;
        tokenSign.user = "admin"

        localStorage.setItem('tokenSign', JSON.stringify(tokenSign))
        console.log(localStorage.getItem("tokenSign"));

        let sessionID = '_tqoyey9uj';
        this.checkSession.checkSession(sessionID).subscribe(
          data => {
            this.userData = data;
            this.checkSession.userData = data
            console.log("*****************")
            console.log("*****************")
            console.log("*****************")
            console.log(this.userData)
            console.log("*****************")
            console.log("*****************")
            console.log("*****************")
            localStorage.setItem('userData', JSON.stringify(data))
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
      else if (this.token != null || this.token != undefined) {
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
              localStorage.setItem('userData', JSON.stringify(data))
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
      else {
        this.authenticated = false;

        let tokenSign: any = {};
        tokenSign.authenticated = this.authenticated;

        localStorage.setItem('tokenSign', JSON.stringify(tokenSign))
        console.log(localStorage.getItem("tokenSign"));
      }

      console.log(this.authenticated)


      this.spinner.hide();
    }, 5000);
  }

}
