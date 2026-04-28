import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  news: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.apiService.getPublic('/news').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.news = response.data;
        }
      }
    });
  }

  getImageUrl(item: any): string {
    if (item.imageUrl && item.imageUrl.startsWith('http')) {
      return item.imageUrl;
    }
    return 'http://localhost:8080' + (item.imageUrl || '/assets/default-news.jpg');
  }
}
