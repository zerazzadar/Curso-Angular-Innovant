import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DetailsProductComponent } from './products/details-product/details-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { Error404Component } from './error404/error404.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes=[
  {path:'',component:HomePageComponent},
  {path:'products',component:ProductListComponent},
  {path:'products/:id',component:DetailsProductComponent},
  {path:'**',component:Error404Component}
];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule],
})
export class AppRoutingModule { }
