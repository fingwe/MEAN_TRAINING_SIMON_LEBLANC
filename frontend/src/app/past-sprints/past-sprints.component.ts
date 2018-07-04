import { Component, OnInit } from '@angular/core';
import { PastSprint } from '../../models/PastSprint';
import { SprintService } from '../sprint.service';
import { SprintType } from '../../models/SprintType';
import { SprintTypeData } from '../data/SprintTypeData';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {

  pastSprints: PastSprint[];

  sprintTypes: SprintTypeData;

  getSprints(): void {
    this.sprintService.getSprints().subscribe(sprints => this.pastSprints = sprints);
  }

  deleteSprints(): void {
    this.sprintService.deleteSprints().subscribe();
  }

  onClickDeleteButton($event) {
    this.deleteSprints();
  }

  constructor(private sprintService: SprintService) {
    this.sprintTypes = new SprintTypeData();
    setInterval(() => {
      this.getSprints();
    },500);
  }

  ngOnInit() {
    this.getSprints();
  }

}
