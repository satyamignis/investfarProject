import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlsPropertyComponent } from './mls-property.component';

describe('MlsPropertyComponent', () => {
  let component: MlsPropertyComponent;
  let fixture: ComponentFixture<MlsPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlsPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
