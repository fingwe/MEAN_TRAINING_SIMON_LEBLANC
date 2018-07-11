import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PastSprint } from '../../models/PastSprint';
import { SprintService } from '../sprint.service';
import { SprintTypeData } from '../data/SprintTypeData';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {

  @Input() pastSprintSelected: boolean;

  pastSprints: PastSprint[];

  sprintTypes: SprintTypeData;

  sterm: String;

  getSprints(): void {
    this.sprintService.getSprints().subscribe(sprints => this.pastSprints = sprints);
  }

  deleteSprints(): void {
    this.sprintService.deleteSprints().subscribe();
  }

  onClickDeleteButton($event) {
    this.deleteSprints();
  }

  onKeyUpSearch($event) {
    if (  1 < this.sterm.length &&  this.sterm.length < 10 ) {
      this.searchSprints();
    } else {
      this.getSprints();
    }
  }

  searchSprints(): void {
    if (this.sterm == '' ) {
      this.getSprints();
    } else {
      this.sprintService.searchSprints(this.sterm).subscribe(sprints => this.pastSprints = sprints);
    }
  }

  constructor(private sprintService: SprintService) {
    this.sprintTypes = new SprintTypeData();
  }

  ngOnInit() {
    this.getSprints();
    setInterval(()=>{
      if (this.pastSprintSelected) {
        this.getSprints();
        this.pastSprintSelected = false;
      }
    },25);
  }

}
