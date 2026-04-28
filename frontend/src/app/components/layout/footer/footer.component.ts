import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  contactInfo: any = {};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPublic('/contact-info').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.contactInfo = response.data;
        }
      }
    });
  }
}
