import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedProducts } from './top-rated-products';

describe('TopRatedProducts', () => {
  let component: TopRatedProducts;
  let fixture: ComponentFixture<TopRatedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
