import { Component, OnInit, HostListener, Host } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean;

  windowWidth: number;

  sideNavWidth: number;

  isLoggedIn: boolean;

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

  logout($event) {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  constructor(private authService: AuthService, private router: Router) 
  {
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

      this.isLoggedIn = this.authService.isLoggedIn();
    },1);
  }

}
