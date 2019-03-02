import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalInvestorConsultantComponent } from './local-investor-consultant.component';

describe('LocalInvestorConsultantComponent', () => {
  let component: LocalInvestorConsultantComponent;
  let fixture: ComponentFixture<LocalInvestorConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalInvestorConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalInvestorConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
