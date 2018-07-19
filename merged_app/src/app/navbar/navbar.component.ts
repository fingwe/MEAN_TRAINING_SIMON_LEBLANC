import { Component, OnInit, HostListener, Host } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean;

  windowWidth: number;

  sideNavWidth: number;

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.windowWidth = window.innerWidth;
    }

  closeNav() {
    this.sideNavWidth = 0;
  }

  openNav() {
    this.sideNavWidth = 250;
  }

  constructor() {
    this.sideNavWidth = 0;
    this.onResize();
  }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    setInterval(() => {
      if ( this.windowWidth < 768 ) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    },100);
  }

}
