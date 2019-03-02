import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorRegistrationComponent } from './contractor-registration.component';

describe('ContractorRegistrationComponent', () => {
  let component: ContractorRegistrationComponent;
  let fixture: ComponentFixture<ContractorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
