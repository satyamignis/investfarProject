import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesRegistrationComponent } from './companies-registration.component';

describe('CompaniesRegistrationComponent', () => {
  let component: CompaniesRegistrationComponent;
  let fixture: ComponentFixture<CompaniesRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
