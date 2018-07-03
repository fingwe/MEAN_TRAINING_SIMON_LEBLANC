import { Component, OnInit } from '@angular/core';
import { PastSprint } from '../../models/PastSprint';
import { SprintService } from '../sprint.service';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {

  pastSprints: PastSprint[];

  getSprints(): void {
    this.sprintService.getSprints().subscribe(sprints => this.pastSprints = sprints);
  }

  constructor(private sprintService: SprintService) { }

  ngOnInit() {

    this.getSprints();
  }

}
