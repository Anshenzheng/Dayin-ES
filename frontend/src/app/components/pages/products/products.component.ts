import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  selectedCategory: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] ? +params['category'] : null;
      this.loadProducts();
    });
  }

  loadCategories(): void {
    this.apiService.getPublic('/product-categories').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories = response.data;
        }
      }
    });
  }

  loadProducts(): void {
    let endpoint = '/products';
    if (this.selectedCategory) {
      endpoint += `?categoryId=${this.selectedCategory}`;
    }
    this.apiService.getPublic(endpoint).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.products = response.data;
        }
      }
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    if (categoryId) {
      this.router.navigate(['/products'], { queryParams: { category: categoryId } });
    } else {
      this.router.navigate(['/products']);
    }
  }
}
