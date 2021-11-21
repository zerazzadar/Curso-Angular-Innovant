import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public users=[
    {nombre:"uno",edad:33 },
    {nombre:"dos", edad:44 },
    {nombre:"tres", edad:0 },
    {nombre:"cuatro", edad:22 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
