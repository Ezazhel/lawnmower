import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtabComponent } from './navtab.component';

describe('NavtabComponent', () => {
  let component: NavtabComponent;
  let fixture: ComponentFixture<NavtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavtabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
