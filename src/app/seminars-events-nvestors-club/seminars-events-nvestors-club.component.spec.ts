import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarsEventsNvestorsClubComponent } from './seminars-events-nvestors-club.component';

describe('SeminarsEventsNvestorsClubComponent', () => {
  let component: SeminarsEventsNvestorsClubComponent;
  let fixture: ComponentFixture<SeminarsEventsNvestorsClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminarsEventsNvestorsClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarsEventsNvestorsClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
