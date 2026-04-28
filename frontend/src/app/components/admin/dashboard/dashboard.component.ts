import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats: any = {
    products: 0,
    news: 0,
    categories: 0,
    unreadMessages: 0
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.apiService.getAdmin('/products').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats.products = response.data.length;
        }
      }
    });

    this.apiService.getAdmin('/news').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats.news = response.data.length;
        }
      }
    });

    this.apiService.getAdmin('/product-categories').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats.categories = response.data.length;
        }
      }
    });

    this.apiService.getAdmin('/contact-messages/unread-count').subscribe({
      next: (response) => {
        if (response.success) {
          this.stats.unreadMessages = response.data;
        }
      }
    });
  }
}
