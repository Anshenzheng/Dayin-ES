import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  logout(): void {
    this.authService.logout();
  }
}
