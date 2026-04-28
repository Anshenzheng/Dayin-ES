import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contactInfo: any = {};
  submitting = false;
  submitSuccess = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.pattern(/^1[3-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadContactInfo();
  }

  loadContactInfo(): void {
    this.apiService.getPublic('/contact-info').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.contactInfo = response.data;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.apiService.postPublic('/contact-message', this.contactForm.value).subscribe({
      next: (response) => {
        this.submitting = false;
        if (response.success) {
          this.submitSuccess = true;
          this.contactForm.reset();
          setTimeout(() => {
            this.submitSuccess = false;
          }, 3000);
        } else {
          this.errorMessage = response.message || '提交失败，请稍后重试';
        }
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = '提交失败，请稍后重试';
      }
    });
  }

  get f() {
    return this.contactForm.controls;
  }
}
