import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './product-edit.component.html'
})
export class AdminProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;
  categories: any[] = [];
  productImages: any[] = [];
  loading = false;
  saving = false;
  successMessage = '';
  errorMessage = '';
  isNew = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      id: [null],
      categoryId: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
      specifications: [''],
      mainImageUrl: [''],
      sortOrder: [0],
      status: ['active']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = +params['id'];
        this.isNew = false;
        this.loadProduct();
        this.loadProductImages();
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

  loadProduct(): void {
    if (!this.productId) return;
    this.loading = true;
    this.apiService.getAdmin(`/products/${this.productId}`).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.productForm.patchValue(response.data);
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadProductImages(): void {
    if (!this.productId) return;
    this.apiService.getAdmin(`/products/${this.productId}/images`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.productImages = response.data;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const data = this.productForm.value;
    let request;

    if (this.isNew) {
      request = this.apiService.postAdmin('/products', data);
    } else {
      request = this.apiService.putAdmin(`/products/${this.productId}`, data);
    }

    request.subscribe({
      next: (response) => {
        this.saving = false;
        if (response.success) {
          this.successMessage = '保存成功';
          if (this.isNew) {
            this.productId = response.data.id;
            this.isNew = false;
            this.productForm.patchValue({ id: response.data.id });
          }
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = response.message || '保存失败';
        }
      },
      error: () => {
        this.saving = false;
        this.errorMessage = '保存失败，请稍后重试';
      }
    });
  }

  onMainImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.apiService.uploadFile(file).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.productForm.patchValue({ mainImageUrl: response.data.url });
          }
        }
      });
    }
  }

  onImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: any) => {
        this.apiService.uploadFile(file).subscribe({
          next: (response) => {
            if (response.success && response.data) {
              this.productImages.push({
                imageUrl: response.data.url,
                sortOrder: this.productImages.length
              });
              if (this.productId) {
                this.saveProductImages();
              }
            }
          }
        });
      });
    }
  }

  removeImage(index: number): void {
    this.productImages.splice(index, 1);
    this.productImages.forEach((img, i) => img.sortOrder = i);
    if (this.productId) {
      this.saveProductImages();
    }
  }

  saveProductImages(): void {
    if (!this.productId) return;
    this.apiService.postAdmin(`/products/${this.productId}/images`, this.productImages).subscribe();
  }

  getImageUrl(image: any): string {
    const url = image.imageUrl || image;
    if (url.startsWith('http')) {
      return url;
    }
    return 'http://localhost:8080' + (url || '/assets/default-product.jpg');
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }

  get f() {
    return this.productForm.controls;
  }
}
