import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  public numberid: string|null = "";
  constructor( private route:ActivatedRoute) {
    const productid=this.route.snapshot.paramMap.get('id');
    this.numberid=productid;
   }

  ngOnInit(): void {
  }

}
