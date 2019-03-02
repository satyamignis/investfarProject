import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateAgentRegistrationComponent } from './real-estate-agent-registration.component';

describe('RealEstateAgentRegistrationComponent', () => {
  let component: RealEstateAgentRegistrationComponent;
  let fixture: ComponentFixture<RealEstateAgentRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstateAgentRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateAgentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
