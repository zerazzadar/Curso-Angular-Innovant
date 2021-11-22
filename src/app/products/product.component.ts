import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
    <h2>
      <a [routerLink]="['products/', product.id]">{{ product.name }}</a>
    </h2>
    <div>Price: {{ product.price }}</div>
  `,
})
export class ProductComponent implements OnInit {
  @Input() product:any
  constructor() {}

  ngOnInit() {}
}
