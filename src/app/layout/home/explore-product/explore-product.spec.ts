import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreProduct } from './explore-product';

describe('ExploreProduct', () => {
  let component: ExploreProduct;
  let fixture: ComponentFixture<ExploreProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
