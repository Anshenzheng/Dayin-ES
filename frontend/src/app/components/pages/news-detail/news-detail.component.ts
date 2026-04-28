import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html'
})
export class NewsDetailComponent implements OnInit {
  news: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newsId = params['id'];
      if (newsId) {
        this.loadNews(newsId);
      }
    });
  }

  loadNews(newsId: number): void {
    this.apiService.getPublic(`/news/${newsId}`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.news = response.data;
        }
      }
    });
  }

  getImageUrl(): string {
    if (this.news.imageUrl && this.news.imageUrl.startsWith('http')) {
      return this.news.imageUrl;
    }
    return 'http://localhost:8080' + (this.news.imageUrl || '/assets/default-news.jpg');
  }
}
