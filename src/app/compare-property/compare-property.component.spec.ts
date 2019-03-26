import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePropertyComponent } from './compare-property.component';

describe('ComparePropertyComponent', () => {
  let component: ComparePropertyComponent;
  let fixture: ComponentFixture<ComparePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
