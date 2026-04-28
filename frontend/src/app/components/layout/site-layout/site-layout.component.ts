import { Component } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `
})
export class SiteLayoutComponent {
}
