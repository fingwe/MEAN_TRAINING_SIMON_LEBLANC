import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintCardComponent } from './new-sprint-card.component';

describe('NewSprintCardComponent', () => {
  let component: NewSprintCardComponent;
  let fixture: ComponentFixture<NewSprintCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSprintCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSprintCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
