import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  companyInfo: any = {};
  cultures: any[] = [];
  honors: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCompanyInfo();
    this.loadCultures();
    this.loadHonors();
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

  loadCultures(): void {
    this.apiService.getPublic('/corporate-culture').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.cultures = response.data;
        }
      }
    });
  }

  loadHonors(): void {
    this.apiService.getPublic('/honors').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.honors = response.data;
        }
      }
    });
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
