import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintsComponent } from './new-sprints.component';

describe('NewSprintsComponent', () => {
  let component: NewSprintsComponent;
  let fixture: ComponentFixture<NewSprintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSprintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
