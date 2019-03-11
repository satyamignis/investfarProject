import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestfarComponent } from './investfar.component';

describe('InvestfarComponent', () => {
  let component: InvestfarComponent;
  let fixture: ComponentFixture<InvestfarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestfarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestfarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
