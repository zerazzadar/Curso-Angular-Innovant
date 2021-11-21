import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { Error404Component } from './error404/error404.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes=[
  {path:'',component:HomePageComponent},
  {path:'products',component:ProductsComponent},
  {path:'products/:id',component:DetailsProductComponent},
  {path:'**',component:Error404Component}
];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule],
})
export class AppRoutingModule { }
