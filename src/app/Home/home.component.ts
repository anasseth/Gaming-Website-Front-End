import { Component, OnInit } from '@angular/core';
import { FavoriteGamesService } from '../Service/favorite-games.service';
import { LaunchGameService } from '../Service/game-launch.service';
import { GamesService } from '../Service/games.service';
// import { GamesService } from '../Service/games.service';
import { SlidersService } from '../Service/sliders.service';

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

  constructor(private launch: LaunchGameService, private games: GamesService, private favourite: FavoriteGamesService) { }


  ngOnInit(): void {
    this.filterValue = this.games.keyword
    try {
      if (this.countPageReload == 0) {
        this.games.setGames();
        this.countPageReload++
      }
      setTimeout(() => {
        this.gamesData = this.games.filterGamesData;
        this.ngOnInit()
      }, 1000);
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

  postFavouriteGame(i: any) {
    console.log(i)
    this.favourite.addFavoriteGames(i).subscribe(
      data => {
        console.log(data)
      }, (err) => {
        console.log(err)
      }, () => {
        console.log("Posted Successfully")
      }
    )
  }
  removeFavouriteGame(i: any) {
    console.log(i)
    this.favourite.removeFavoriteGame(i).subscribe(
      data => {
        console.log(data)
      }, (err) => {
        console.log(err)
      }, () => {
        console.log("Posted Successfully")
      }
    )
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
    let tokenSign: any = localStorage.getItem("tokenSign");
    tokenSign = JSON.parse(tokenSign);

    if (tokenSign.authenticated == true) {
      this.launch.launchGame(i);
    }
    else if (tokenSign.authenticated == false && tokenSign.user == "admin") {
      this.launch.launchGame(i);
    }
    else {
      alert("Authentication Error, Please Sign In")
    }
  }

}
