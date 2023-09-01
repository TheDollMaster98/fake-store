import { Product } from 'src/app/services/interfaces/Product';
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ProductService } from './Products.service';



describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
  });
  it('should be created', inject(
    [ProductService],
    (service: ProductService) => {
      expect(service).toBeTruthy();
    }
  ));
  it('should get products', inject(
    [HttpTestingController, ProductService],
    (httpMock: HttpTestingController, ProductService: ProductService) => {
      const expectedProducts = [
        {
          id: 12,
          title: 'tracolla',
          price: 200,
          description: 'description',
          image: ' https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          category: 'clothes'
        },
        {
          id: 10,
          title: 'zaino',
          price: 300,
          description: 'description2',
          image: ' https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          category: 'clothes'
        },
      ];

      ProductService.fetchProducts().subscribe((data: Product[]) => {
        expect(data).toEqual(expectedProducts);
      });

      const req = httpMock.expectOne('https://fakestoreapi.com/products');
      expect(req.request.method).toBe('GET');
      req.flush(expectedProducts);

      httpMock.verify();
    }
  ));
});
