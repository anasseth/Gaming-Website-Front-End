import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  breakpoint: any;

  background = 'background';
  text = 'text-style';
  background1 = 'background1';
  text1 = 'text-style1';
  distance = 100;
  constructor() { }


  images = [
    { path: '/assets/images/img 4.jpg' },
    { path: '/assets/images/img6.jpg' },

    { path: '/assets/images/img7.jpg' },


  ]
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 420) ? 1 : 7;

  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 420) ? 1 : 7;
  }


  title = 'horizontal-menu-test';
  link = 'link';
  items: any[] = [
    { title: 'Videoslots', link: '' },
    { title: 'Videopoker', link: '' },
    { title: 'Videoslots', link: '' },
    { title: 'Videopoker', link: '' },
    { title: 'Videoslots', link: '' },
    { title: 'Videopoker', link: '' },


  ];
  items1: any[] = [
    { title: 'Pragmatic', link: '' },
    { title: 'Appolo', link: '' },
    { title: 'Pragmatic', link: '' },
    { title: 'Appolo', link: '' },
    { title: 'Pragmatic', link: '' },
    { title: 'Appolo', link: '' },
    { title: 'Pragmatic', link: '' },
    { title: 'Appolo', link: '' },
    { title: 'Pragmatic', link: '' },
    { title: 'Appolo', link: '' },
    { title: 'Pragmatic', link: '' },
    { title: 'Appolo', link: '' },


  ];

}
