import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Error404Component } from './error404/error404.component';
import { DetailsProductComponent } from './products/details-product/details-product.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductComponent } from './products/product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    Error404Component,
    DetailsProductComponent,
    ProductListComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
