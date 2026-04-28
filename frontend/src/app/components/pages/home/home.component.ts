import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  companyInfo: any = {};
  products: any[] = [];
  news: any[] = [];
  cultures: any[] = [];
  currentSlide = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCompanyInfo();
    this.loadProducts();
    this.loadNews();
    this.loadCultures();
  }

  loadCompanyInfo(): void {
    this.apiService.getPublic('/company-info').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.companyInfo = response.data;
        }
      }
    });
  }

  loadProducts(): void {
    this.apiService.getPublic('/products').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.products = response.data.slice(0, 4);
        }
      }
    });
  }

  loadNews(): void {
    this.apiService.getPublic('/news').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.news = response.data.slice(0, 3);
        }
      }
    });
  }

  loadCultures(): void {
    this.apiService.getPublic('/corporate-culture').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.cultures = response.data;
        }
      }
    });
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.products.length - 1;
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide < this.products.length - 1 ? this.currentSlide + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  getCultureIcon(type: string): string {
    const icons: any = {
      vision: '🎯',
      mission: '🚀',
      value: '💎',
      philosophy: '📖'
    };
    return icons[type] || '⭐';
  }
}
