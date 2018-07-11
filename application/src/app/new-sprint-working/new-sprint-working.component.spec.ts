import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintWorkingComponent } from './new-sprint-working.component';

describe('NewSprintWorkingComponent', () => {
  let component: NewSprintWorkingComponent;
  let fixture: ComponentFixture<NewSprintWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSprintWorkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSprintWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
