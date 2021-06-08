import { Component, OnInit } from '@angular/core';
import { GamesService } from '../Service/games.service';
// import { GamesService } from '../Service/games.service';
import { SlidersService } from '../Service/sliders.service'

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

  constructor(private games: GamesService) { }

  ngOnInit(): void {
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

  GetGamesByCatgory(Name: string) {
    this.filteredData = [];
    for (var i = 0; i < this.gamesData.length; i++) {
      if (Name == this.gamesData[i].CatergoryName) {
        this.filteredData.push(this.gamesData[i])
      }
    }
  }

}
