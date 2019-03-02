import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFinancedNoBanksNeededComponent } from './owner-financed-no-banks-needed.component';

describe('OwnerFinancedNoBanksNeededComponent', () => {
  let component: OwnerFinancedNoBanksNeededComponent;
  let fixture: ComponentFixture<OwnerFinancedNoBanksNeededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerFinancedNoBanksNeededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerFinancedNoBanksNeededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
