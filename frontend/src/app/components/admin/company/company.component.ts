import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-company',
  templateUrl: './company.component.html'
})
export class AdminCompanyComponent implements OnInit {
  companyForm: FormGroup;
  loading = false;
  saving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.companyForm = this.formBuilder.group({
      id: [null],
      title: [''],
      content: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCompanyInfo();
  }

  loadCompanyInfo(): void {
    this.loading = true;
    this.apiService.getAdmin('/company-info').subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.companyForm.patchValue(response.data);
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const data = this.companyForm.value;
    const endpoint = data.id ? `/company-info` : `/company-info`;
    const method = data.id ? this.apiService.postAdmin(endpoint, data) : this.apiService.postAdmin(endpoint, data);

    method.subscribe({
      next: (response) => {
        this.saving = false;
        if (response.success) {
          this.successMessage = '保存成功';
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

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.apiService.uploadFile(file).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.companyForm.patchValue({ imageUrl: response.data.url });
          }
        }
      });
    }
  }
}
