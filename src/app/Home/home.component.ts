import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoriteGamesService } from '../Service/favorite-games.service';
import { LaunchGameService } from '../Service/game-launch.service';
import { GamesService } from '../Service/games.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: "ContainerSetting"
  }
})

export class HomeComponent implements OnInit {

  gamesData: any = [];
  filteredData: any = [];
  countPageReload: number = 0;
  filterValue: string = '';
  launchGameData: any;
  showPopup: boolean = false;
  url!: string;
  urlSafe!: SafeResourceUrl;
  deviceInfo: any = null;
  checkFirstTime: number = 0;
  device: string = "desktop";

  constructor(private deviceService: DeviceDetectorService, public sanitizer: DomSanitizer, private spinner: NgxSpinnerService, public launch: LaunchGameService, public games: GamesService, private favourite: FavoriteGamesService) {

  }


  ngOnInit(): void {
    if (this.checkFirstTime == 0) {
      this.epicFunction();
      this.checkFirstTime++
    }


    this.filterValue = this.games.keyword
    try {
      if (this.countPageReload == 0) {
        this.games.setGames();
        this.countPageReload++
      }
      setTimeout(() => {
        this.gamesData = this.games.filterGamesData;
        this.spinner.hide()
        this.ngOnInit()
      }, 2000);
      // this.games.getGames().subscribe(
      //   (data) => {
      //     console.log(data)
      //     this.gamesData = data
      //     this.filteredData = data
      //   }, (err) => {
      //     console.log(err)
      //   }
      // )
    }
    catch (x) {
      console.log(x)
    }
  }

  updateFavouriteGame() {
    this.games.activeGames = "Favorite"
    this.spinner.show()
    this.favourite.setFavoriteGames();
    setTimeout(() => {
      this.games.filterGamesData = this.favourite.favoriteGameData
    }, 300);
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.

    if (isMobile == true || isTablet == true) {
      this.device = "mobile"
    }
    else {
      this.device = "desktop"
    }
  }

  postFavouriteGame(i: any) {
    let tokenSign: any = localStorage.getItem("tokenSign");
    tokenSign = JSON.parse(tokenSign);

    if (tokenSign.authenticated == true) {
      console.log(i)
      this.favourite.addFavoriteGames(i).subscribe(
        data => {
          console.log(data)
        }, (err) => {
          console.log(err)
        }, () => {
          alert("Posted Successfully")
          console.log("Posted Successfully")
          // this.updateFavouriteGame()
        }
      )
    }
    else {
      alert("Authentication Error! Please Sign In")
    }
  }
  removeFavouriteGame(i: any) {
    let tokenSign: any = localStorage.getItem("tokenSign");
    tokenSign = JSON.parse(tokenSign);

    if (tokenSign.authenticated == true) {
      console.log(i)
      this.favourite.removeFavoriteGame(i).subscribe(
        data => {
          console.log(data)
        }, (err) => {
          console.log(err)
        }, () => {
          alert("Removed Successfully")
          console.log("Removed Successfully")
          this.updateFavouriteGame()
        }
      )
    }
    else {
      alert("Authentication Error! Please Sign In")
    }
  }

  GetGamesByCatgory(Name: string) {
    this.filteredData = [];
    for (var i = 0; i < this.gamesData.length; i++) {
      if (Name == this.gamesData[i].CatergoryName) {
        this.filteredData.push(this.gamesData[i])
      }
    }
  }
  gameLaunch(i: any) {
    this.url = "";
    let tokenSign: any = localStorage.getItem("tokenSign");
    tokenSign = JSON.parse(tokenSign);

    if (tokenSign.authenticated == true) {
      this.launch.launchGame(i, this.device).subscribe(
        data => {

          this.launchGameData = JSON.parse(data)
          console.log(this.launchGameData)
        }, (error) => {
          console.log(error)
        }, () => {

          if (this.launchGameData.url != null || this.launchGameData.url != undefined) {
            if (this.device == "desktop") {
              console.log(this.launchGameData.url)
              window.open(this.launchGameData.url, "_blank");
            }
            else if (this.device == "mobile") {
              this.showPopup = true;
              this.url = this.launch.launchGameURL
              this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.launchGameData.url);
            }

            // console.log(this.launchGameData.url)
            // window.open(this.launchGameData.url, "_blank");
          }
          else {
            alert("Authentication Error")
          }
        }
      );
    }
    else if (tokenSign.user == "admin") {
      this.launch.launchGame(i, this.device).subscribe(
        data => {

          this.launchGameData = JSON.parse(data)
          console.log(this.launchGameData)
        }, (error) => {
          console.log(error)
        }, () => {

          if (this.launchGameData.url != null || this.launchGameData.url != undefined) {
            if (this.device == "desktop") {
              this.showPopup = false
              console.log(this.launchGameData.url)
              window.open(this.launchGameData.url, "_blank");
            }
            else if (this.device == "mobile") {
              this.showPopup = true;
              this.url = this.launch.launchGameURL
              this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.launchGameData.url);
            }

            // console.log(this.launchGameData.url)
            // window.open(this.launchGameData.url, "_blank");
          }
          else {
            alert("Authentication Error")
          }
        }
      );
    }
    else {
      alert("Authentication Error, Please Sign In")
    }
  }

}
