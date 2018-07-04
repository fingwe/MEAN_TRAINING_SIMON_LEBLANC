import { Component, OnInit } from '@angular/core';
import { StatusData } from '../data/StatusData';
import { SprintTypeData } from '../data/SprintTypeData';
import { PastSprint } from '../../models/PastSprint';
import { SprintType } from '../../models/SprintType';

@Component({
  selector: 'app-new-sprint-card',
  templateUrl: './new-sprint-card.component.html',
  styleUrls: ['./new-sprint-card.component.css']
})
export class NewSprintCardComponent implements OnInit {

  notSelected: boolean;

  empty: boolean;

  notReady: boolean;

  title = "New Sprint!";

  sprint: PastSprint;

  sprintTypes: SprintType[];

  selectedSprintType: SprintType;

  type: SprintType;

  description: string;

  timerIsRequested: boolean;

  initRequest($event) {
    this.init();
  }

  /**
   * Method to initialize the page data
   */
  init() {
    this.sprintTypes = new SprintTypeData().getData();
    this.sprint = new PastSprint();
    this.description = "";
    this.selectedSprintType = new SprintType(this.sprintTypes[3].name,this.sprintTypes[3].duration);
    this.timerIsRequested = false;
    this.notSelected = true;
    this.empty = true;
    this.notReady = true;
  }

  onClickStart(event) {
    this.sprint.name = this.selectedSprintType.name;
    this.sprint.duration = this.selectedSprintType.duration;
    this.sprint.description = this.description;
    this.timerIsRequested = true;
  }

  /**
   * Method for managing event of select box
   * must select value
   * @param event 
   */
  setSelectedValue(event) {
    this.notSelected = false;
    this.validateButtonActivationConditions();
  }

  /**
   * Method for checking if textarea is not empty
   * @param event 
   */
  checkDescriptionText(event) {
    if ( this.description != "" ) {
      this.empty = false;
    } else {
      this.empty = true;
    }
    this.validateButtonActivationConditions();
  }

  /**
   * Method for validating if form is ready
   */
  validateButtonActivationConditions()
  {
    if (!this.notSelected && !this.empty) {
      this.notReady = false;
    } else {
      this.notReady = true;
    }
  }

  constructor() {
    this.init();
  }

  ngOnInit() {
    
  }

}
