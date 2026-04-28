import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;
  errorMessage = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: (response) => {
        this.submitting = false;
        if (response.success) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.errorMessage = response.message || '登录失败';
        }
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = '登录失败，请检查用户名和密码';
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
