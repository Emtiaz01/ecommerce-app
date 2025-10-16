import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toparrow } from './toparrow';

describe('Toparrow', () => {
  let component: Toparrow;
  let fixture: ComponentFixture<Toparrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toparrow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toparrow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
