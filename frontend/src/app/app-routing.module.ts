import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './components/layout/site-layout/site-layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { ScenariosComponent } from './components/pages/scenarios/scenarios.component';
import { NewsComponent } from './components/pages/news/news.component';
import { NewsDetailComponent } from './components/pages/news-detail/news-detail.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminCompanyComponent } from './components/admin/company/company.component';
import { AdminProductsComponent } from './components/admin/products/products.component';
import { AdminProductEditComponent } from './components/admin/product-edit/product-edit.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'scenarios', component: ScenariosComponent },
      { path: 'news', component: NewsComponent },
      { path: 'news/:id', component: NewsDetailComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'company', component: AdminCompanyComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/new', component: AdminProductEditComponent },
      { path: 'products/:id', component: AdminProductEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
