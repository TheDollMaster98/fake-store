import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from 'src/app/services/Products.service';

import { Product } from 'src/app/services/interfaces/Product';

@Component({
  selector: 'app-product-details',
  host: {
    class: 'app-product-details'
  },
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  isloading?: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.isloading = true;

    this.activatedRoute.params.subscribe(params => {
      this.isloading = true;

      this.productService.fetchProductById(params['id']).subscribe((fetchedProduct?: Product) => {
        this.product = fetchedProduct;
        this.isloading = false;
      });
//test valore di derfasult, required e custom validator

//mockare anche afterclosed oltre allàope
    });

  }
}
