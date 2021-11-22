import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  public getallProduct()
  {
    return this.products;
  }

  public getProductById(id:any){

    const [variable]:any= this.products.filter(product => product.id == id)
    return variable
  }

  public putProduct(product:any):void{
    this.products.push(product);
  }

  constructor() { }
}
