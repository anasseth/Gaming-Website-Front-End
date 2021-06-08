import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './Service/categories.service';
import { FavoriteGamesService } from './Service/favorite-games.service';
import { GamesProviderService } from './Service/games-provider.service';
import { GamesService } from './Service/games.service';
import { SearchGamesService } from './Service/search-games.service';
import { SlidersService } from './Service/sliders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game-ui';
  constructor(
    private categories: CategoriesService,
    private favoriteGames: FavoriteGamesService,
    private gamesProviders: GamesProviderService,
    private games: GamesService,
    private searchGames: SearchGamesService,
    private sliders: SlidersService) {

  }

  ngOnInit() {
    this.categories.setCategories();
    this.favoriteGames.setFavoriteGames();
    this.gamesProviders.setGameProviders();
    this.games.setGames();
    this.searchGames.setSearchGames();
    this.sliders.setSlider();

    setTimeout(() => {
    //   console.log(this.categories.categoriesData)
    //   console.log(this.favoriteGames.favoriteGameData)
    //   console.log(this.gamesProviders.gameProvidersData)
    //   console.log(this.games.gamesData)
      console.log(this.searchGames.searchGamesData)
    //   console.log(this.sliders.sliderData)
    }, 3000);
  }
}
