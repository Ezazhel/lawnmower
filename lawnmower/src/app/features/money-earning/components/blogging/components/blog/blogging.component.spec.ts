import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggingComponent } from './blogging.component';

describe('BloggingComponent', () => {
  let component: BloggingComponent;
  let fixture: ComponentFixture<BloggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
