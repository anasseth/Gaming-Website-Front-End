import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  breakpoint: any;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 420) ? 1 : 6;

  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 420) ? 1 : 6;
  }
}
