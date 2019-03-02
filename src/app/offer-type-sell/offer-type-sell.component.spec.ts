import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeSellComponent } from './offer-type-sell.component';

describe('OfferTypeSellComponent', () => {
  let component: OfferTypeSellComponent;
  let fixture: ComponentFixture<OfferTypeSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTypeSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTypeSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
