import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    if (this.hasToken()) {
      this.loadCurrentUser();
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private loadCurrentUser(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (response) => {
        if (response.success) {
          this.currentUserSubject.next(response.data);
        }
      },
      error: () => {
        this.logout();
      }
    });
  }

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.apiService.login(username, password).subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('token', response.data.token);
            this.currentUserSubject.next(response.data);
            this.isLoggedInSubject.next(true);
          }
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
