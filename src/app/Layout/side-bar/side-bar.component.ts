import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
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
