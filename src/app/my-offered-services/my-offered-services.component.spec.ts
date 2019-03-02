import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOfferedServicesComponent } from './my-offered-services.component';

describe('MyOfferedServicesComponent', () => {
  let component: MyOfferedServicesComponent;
  let fixture: ComponentFixture<MyOfferedServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOfferedServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOfferedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
