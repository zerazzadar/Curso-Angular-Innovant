import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
})
export class DetailsProductComponent implements OnInit {
  public product: any = {};
  private productid: string | null;

  constructor(private route: ActivatedRoute, private dataSvc: DataService) {
    this.productid = this.route.snapshot.paramMap.get('id');
    this.product = this.returnOneProduct(this.productid);
    console.log(this.product);
  }

  ngOnInit(): void {}

  public returnOneProduct(pproductid: string | null): any {
    return this.dataSvc.getProductById(pproductid);
  }
}
