import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GamesProviderService } from 'src/app/Service/games-provider.service';
import { GamesService } from 'src/app/Service/games.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  gamesProviderData: any = [];

  constructor(private gamesProvider:GamesProviderService,private games:GamesService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.gamesProvider.getGameProviders().subscribe(
      data => {
        this.gamesProviderData = data
        console.log(this.gamesProviderData)
      }
    )
  }

  getGamesByProvider(Name:string,id:number){
    this.spinner.show()
    console.log(Name)
    console.log(id)
    this.games.GetGamesByProvider(Name,id);
  }

}
