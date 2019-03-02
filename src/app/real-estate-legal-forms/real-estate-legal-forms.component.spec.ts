import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateLegalFormsComponent } from './real-estate-legal-forms.component';

describe('RealEstateLegalFormsComponent', () => {
  let component: RealEstateLegalFormsComponent;
  let fixture: ComponentFixture<RealEstateLegalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstateLegalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateLegalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
