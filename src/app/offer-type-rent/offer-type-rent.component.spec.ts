import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeRentComponent } from './offer-type-rent.component';

describe('OfferTypeRentComponent', () => {
  let component: OfferTypeRentComponent;
  let fixture: ComponentFixture<OfferTypeRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTypeRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTypeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
