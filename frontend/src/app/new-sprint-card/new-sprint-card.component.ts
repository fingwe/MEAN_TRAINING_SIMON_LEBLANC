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

  title = "New Sprint!";

  sprint: PastSprint;

  sprintTypes: SprintType[];

  selectedSprintType: SprintType;

  type: SprintType;

  constructor() {
    this.sprintTypes = new SprintTypeData().getData();
    this.sprint = new PastSprint();
    this.selectedSprintType = new SprintType(this.sprintTypes[0].name,this.sprintTypes[0].duration);
  }

  ngOnInit() {
    
  }

}
