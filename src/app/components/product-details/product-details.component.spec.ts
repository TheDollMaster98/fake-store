import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';

import { ProductService } from 'src/app/services/Products.service';

import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from 'src/app/services/interfaces/Product';

const expectedProductDetails: Product = {
  id: 12,
  title: 'tracolla',
  price: 200,
  description: 'description',
  image: ' https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  category: 'Jewelery ',
};

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  let getProductDetailsSpy: any;

  beforeEach(() => {
    // questa costante productService è una funzione che restituisce un oggetto che simula il servizio ProductService
    // sono tutti i pezzi da sostuire quelli dopo []
    //quello scritto da noi a mano lo fa jasmine

    const productService = jasmine.createSpyObj('ProductService', [
      'fetchProductById',
    ]);

    getProductDetailsSpy = productService.fetchProductById.and.returnValue(
      of(expectedProductDetails) //of (observable del prodotto)
    );

    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      //da testare
      providers: [
        {
          provide: ProductService,
          useValue: productService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 42 }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should call fetchProductsByID and return selected Product', fakeAsync(() => {

    expect(component.product).toEqual(undefined);
    expect(getProductDetailsSpy).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(component.product).toEqual(expectedProductDetails);
    expect(getProductDetailsSpy).toHaveBeenCalled();
  }));
});
