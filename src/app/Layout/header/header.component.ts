import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/Service/categories.service';
import { GamesProviderService } from 'src/app/Service/games-provider.service';
import { GamesService } from 'src/app/Service/games.service';
import { SlidersService } from 'src/app/Service/sliders.service';
import { TranslateService } from '@ngx-translate/core';
import { FavoriteGamesService } from 'src/app/Service/favorite-games.service';
import { CheckSessionService } from 'src/app/Service/check-session.service';
import { NgxSpinnerService } from 'ngx-spinner';

// import { NgSearchFilterService } from 'ng-search-filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Input('authenticated') authenticated: boolean = false;

  sliderData: any = [];
  gamesProviderData: any = [];
  categoriesData: any = [];
  searchGamesData: any = [];
  listenFunc: any;
  userData: any = {};
  searchInputValue: any = "";
  focusFirstTime: number = 0;
  items: any[] = [
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private favourite: FavoriteGamesService,
    private translate: TranslateService,
    private games: GamesService,
    elementRef: ElementRef,
    renderer: Renderer2,
    private categories: CategoriesService,
    private slider: SlidersService,
    private gamesProvider: GamesProviderService,
    public checkSession: CheckSessionService,
  ) {

    translate.setDefaultLang('en');

    this.listenFunc = renderer.listen(elementRef.nativeElement, 'click', (event) => {
      event.preventDefault();
      let target = event.target || event.srcElement || event.currentTarget;
      console.log(target.tagName);
      if (target.tagName == 'A') {
        this.games.GetGamesByCatgory(target.innerHTML);
      }
    });

  }
  ngOnInit(): void {
    console.log(this.authenticated)

    setTimeout(() => {
      this.userData = this.checkSession.userData
    }, 3000);
    this.gamesProvider.getGameProviders().subscribe(
      data => {
        this.gamesProviderData = data
        console.log(this.gamesProviderData)
      }
    )
    this.slider.getSliders().subscribe(
      (data) => {
        this.sliderData = data;
        console.log(this.sliderData)
      },
    )
    this.categories.getCategories().subscribe(
      data => {
        this.categoriesData = data
        console.log(this.categoriesData)
      }, (error) => {
        console.log(error)
      }, () => {
        this.settingHorizontalMenuData()
      }
    )
  }

  getFavouriteGame() {
    this.games.activeGames = "Favorite"
    this.spinner.show()
    this.favourite.setFavoriteGames();
    setTimeout(() => {
      this.games.filterGamesData = this.favourite.favoriteGameData
    }, 300);
  }

  getGamesByCategory(Name: string) {
    this.spinner.show()
    this.games.activeGames = "Main"
    this.games.GetGamesByCatgory(Name);
  }

  setUserData() {
    // if (this.userData == undefined || this.userData == null || this.userData == {}) {
      let userData: any = localStorage.getItem("userData");
      this.userData = JSON.parse(userData)
      console.log(this.userData)
      if(this.userData.status == 0){
        // this.spinner.show()
        // console.log("Recalling ")
        // this.checkSession.setUserData();
        // setTimeout(() => {
        //   this.ngOnInit() 
        //   this.spinner.hide()
        // }, 2000);
        window.location.reload();

      }
    
  }

  getGamesByProviders(Name: string, id: number) {
    this.games.activeGames = "Main"
    this.spinner.show()
    this.games.GetGamesByProvider(Name, id);
  }

  setSearchGames(keyword: string) {
    this.spinner.show()
    this.games.setSearchGames(keyword)
  }

  updateSearchKeyword(event: any) {

    this.games.activeGames = "Main"
    if (this.searchInputValue != event.target.value) {
      this.spinner.show()
      this.searchInputValue = event.target.value;
      this.games.keyword = this.searchInputValue;
      console.log(this.searchInputValue)
      this.setSearchGames(this.searchInputValue)
    }
    // this.games.updateResults();
  }


  settingHorizontalMenuData() {
    let item: any = {}
    for (var i = 0; i < this.categoriesData.length; i++) {
      item.title = this.categoriesData[i].CatergoryName
      this.items.push(item)
      item = {};
    }
    console.log(this.items[0].title)
  }


  background = 'background';
  text = 'text-style';
  title = 'horizontal-menu-test';
  link = 'link';
  distance = 30;
}


