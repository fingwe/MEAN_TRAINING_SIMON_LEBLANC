import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintEndModalComponent } from './new-sprint-end-modal.component';

describe('NewSprintEndModalComponent', () => {
  let component: NewSprintEndModalComponent;
  let fixture: ComponentFixture<NewSprintEndModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSprintEndModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSprintEndModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
