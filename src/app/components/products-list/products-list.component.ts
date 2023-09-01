import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/Products.service';
import { Product } from 'src/app/services/interfaces/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products?: Product[];
  isloading?: boolean;

  constructor(
    private productService: ProductService,
    ) {
  }

  ngOnInit(): void {

    this.isloading = true;

    this.productService.fetchProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.isloading = false;
    });
  }

}
