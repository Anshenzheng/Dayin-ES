import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
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

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SiteLayoutComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ProductDetailComponent,
    ScenariosComponent,
    NewsComponent,
    NewsDetailComponent,
    ContactComponent,
    LoginComponent,
    AdminLayoutComponent,
    DashboardComponent,
    AdminCompanyComponent,
    AdminProductsComponent,
    AdminProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
