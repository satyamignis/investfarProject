import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyTermsComponent } from './privacy-policy-terms.component';

describe('PrivacyPolicyTermsComponent', () => {
  let component: PrivacyPolicyTermsComponent;
  let fixture: ComponentFixture<PrivacyPolicyTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
