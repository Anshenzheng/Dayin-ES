import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  currentUser: any = null;
  unreadMessageCount = 0;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isActive(url: string): boolean {
    return this.router.url === '/admin' + url || this.router.url.startsWith('/admin' + url + '/');
  }

  logout(): void {
    this.authService.logout();
  }
}
