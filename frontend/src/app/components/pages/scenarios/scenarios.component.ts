import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html'
})
export class ScenariosComponent implements OnInit {
  scenarios: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadScenarios();
  }

  loadScenarios(): void {
    this.apiService.getPublic('/application-scenarios').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.scenarios = response.data;
        }
      }
    });
  }

  getImageUrl(scenario: any): string {
    if (scenario.imageUrl && scenario.imageUrl.startsWith('http')) {
      return scenario.imageUrl;
    }
    return 'http://localhost:8080' + (scenario.imageUrl || '/assets/default-scenario.jpg');
  }
}
