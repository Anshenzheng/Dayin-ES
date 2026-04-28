import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  images: any[] = [];
  currentSlide = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(productId);
        this.loadProductImages(productId);
      }
    });
  }

  loadProduct(productId: number): void {
    this.apiService.getPublic(`/products/${productId}`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.product = response.data;
        }
      }
    });
  }

  loadProductImages(productId: number): void {
    this.apiService.getPublic(`/products/${productId}/images`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.images = response.data;
          if (this.images.length === 0 && this.product.mainImageUrl) {
            this.images = [{ imageUrl: this.product.mainImageUrl }];
          }
        }
      }
    });
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.images.length - 1;
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide < this.images.length - 1 ? this.currentSlide + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  getImageUrl(image: any): string {
    const url = image.imageUrl || image;
    if (url.startsWith('http')) {
      return url;
    }
    return 'http://localhost:8080' + (url || '/assets/default-product.jpg');
  }
}
