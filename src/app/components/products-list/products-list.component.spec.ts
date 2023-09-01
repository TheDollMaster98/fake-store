import { ProductService } from 'src/app/services/Products.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  let getProductsSpy;

  beforeEach(() => {

    const productService = jasmine.createSpyObj('ProductService', ['fetchProducts']);
    getProductsSpy = productService.fetchProducts.and.returnValue(of(expectedProducts).pipe(delay(1)));

    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      providers: [{provide: ProductService, useValue: productService}]
    });
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should call fetchProducts and return Product[]', fakeAsync(() => {
    expect(component.isloading).toEqual(undefined);
    expect(component.products).toEqual(undefined);

    fixture.detectChanges()

    expect(component.isloading).toEqual(true);
    expect(component.products).toEqual(undefined);

    tick(2)

    expect(component.isloading).toEqual(false);
    expect(component.products).toEqual(expectedProducts);

    fixture.detectChanges() //anche riga 59

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(expectedProducts.length);
  }))
});
