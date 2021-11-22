import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products: any = [];
  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.GetAllProduct();
  }

  private GetAllProduct() {
    this.products = this.dataSvc.getallProduct();
  }

  public insertpproducto(): void {
    const nuevoproducto = {
      id: 3,
      name: 'platanos',
      category: 'Food',
      description: 'banana for food',
      price: '0.50',
    };
    this.dataSvc.putProduct(nuevoproducto);
    this.GetAllProduct();
  }
}
