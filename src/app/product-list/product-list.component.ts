import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products= [
    {
      id:1,
      name:'egg',
      category:'Food',
      description:'egg for food',
      price: '2'

    },
    {
      id:2,
      name:'meat',
      category:'Food',
      description:'meat for food',
      price: '20.21'

    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
