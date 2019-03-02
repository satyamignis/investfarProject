import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImprovementNetworkComponent } from './home-improvement-network.component';

describe('HomeImprovementNetworkComponent', () => {
  let component: HomeImprovementNetworkComponent;
  let fixture: ComponentFixture<HomeImprovementNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeImprovementNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImprovementNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
