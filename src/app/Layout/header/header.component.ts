import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  background = 'background';
  text = 'text-style';
  background1 = 'background1';
  text1 = 'text-style1';
  distance = 100;
  constructor() { }


  images = [
    { path: '/assets/images/img1.jpg' },
    { path: '/assets/images/img4.png' },

    { path: '/assets/images/img3.jpg' },


  ]
  ngOnInit(): void {
  }
  title = 'horizontal-menu-test';
  link = 'link';
  items: any[] = [
    { title: 'Orangies', link: '' },
    { title: 'Orangies', link: '' },
    { title: 'Orangies', link: '' },
    { title: 'Orangies', link: '' },
    { title: 'Orangies', link: '' },
    { title: 'Orangies', link: '' },


  ];
}
