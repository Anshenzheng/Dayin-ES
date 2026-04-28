import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.apiService.getAdmin('/products').subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.products = response.data;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.apiService.getAdmin('/product-categories').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories = response.data;
        }
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '未分类';
  }

  deleteProduct(id: number): void {
    if (confirm('确定要删除该产品吗？')) {
      this.apiService.deleteAdmin(`/products/${id}`).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadProducts();
          }
        }
      });
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/admin/products', id]);
  }

  getStatusText(status: string): string {
    return status === 'active' ? '上架' : '下架';
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'badge-success' : 'badge-warning';
  }
}
