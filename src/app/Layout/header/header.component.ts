import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Service/categories.service';
import { GamesProviderService } from 'src/app/Service/games-provider.service';
import { GamesService } from 'src/app/Service/games.service';
import { SlidersService } from 'src/app/Service/sliders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sliderData: any = [];
  gamesProviderData: any = [];
  categoriesData: any = [];
  listenFunc: any;
  searchInputValue: any = "";
  focusFirstTime: number = 0;
  items: any[] = [
  ];

  constructor(private games: GamesService, elementRef: ElementRef, renderer: Renderer2, private categories: CategoriesService, private slider: SlidersService, private gamesProvider: GamesProviderService) {
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
  setSearchGames() {
    if (this.focusFirstTime == 0) {
      this.games.setSearchGames()
      this.focusFirstTime++;
    }
  }

  getSearchGame() {
    console.log(this.searchInputValue)
    this.games.GetSearchGames(this.searchInputValue);
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


