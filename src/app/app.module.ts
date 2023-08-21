import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './_helpers/httpInterceptor';
import { HttpResponseInterceptor } from './_helpers/errorInterceptor';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ProductService } from './_services/product.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    DashboardModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi:true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi:true,
    },
    fakeBackendProvider,
    ProductService
],
})
export class AppModule { }