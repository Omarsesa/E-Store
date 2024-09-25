import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SingleCardComponent } from './single-card/single-card.component'; 
import { ProductsComponent } from './products/products.component';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BestsellerManagementComponent } from './bestseller-management/bestseller-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'bestseller', component: BestsellerComponent },
  { path: 'contactus', component: ContactUsFormComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    SingleCardComponent,
    ProductsComponent,
    BestsellerComponent,
    ContactUsFormComponent,
    CartComponent,
    FooterComponent,
    SplashScreenComponent,
    AboutUsComponent,
    BestsellerManagementComponent,
    ProductManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AppRoutingModule 
  ],
  exports: [RouterModule,
    SingleCardComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
