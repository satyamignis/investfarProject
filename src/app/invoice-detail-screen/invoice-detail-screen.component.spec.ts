import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailScreenComponent } from './invoice-detail-screen.component';

describe('InvoiceDetailScreenComponent', () => {
  let component: InvoiceDetailScreenComponent;
  let fixture: ComponentFixture<InvoiceDetailScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDetailScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
