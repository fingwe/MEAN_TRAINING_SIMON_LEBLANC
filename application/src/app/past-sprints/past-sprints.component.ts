import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PastSprint } from '../../models/PastSprint';
import { SprintService } from '../sprint.service';
import { SprintTypeData } from '../data/SprintTypeData';
import { Sort } from '../../models/Sort';

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

  totalItems: Number;

  sort: Sort;

  getSprints(): void {
    this.sprintService.getSprints().subscribe(sprints => this.pastSprints = sprints);
  }

  deleteSprints(): void {
    this.sprintService.deleteSprints().subscribe(()=>{
      this.getSprints();
    });
  }

  onClickDeleteButton($event) {
    this.deleteSprints();
  }

  onSelectLength($event) {
    this.sort.init();
    this.sort.isSelectedLength = true;
    if (this.sort.ascendingLength) {
      this.sort.ascendingLength = false
    } else {
      this.sort.ascendingLength = true;
    }
  }

  onSelectStatus($event) {
    this.sort.init();
    this.sort.isSelectedStatus = true;
    if (this.sort.ascendingStatus) {
      this.sort.ascendingStatus = false
    } else {
      this.sort.ascendingStatus = true;
    }
  }

  onSelectDate($event) {
    this.sort.init();
    this.sort.isSelectedDate = true;
    if (this.sort.ascendingDate) {
      this.sort.ascendingDate = false
    } else {
      this.sort.ascendingDate = true;
    }
  }

  onSelectStart($event) {
    this.sort.init();
    this.sort.isSelectedStart = true;
    if (this.sort.ascendingStart) {
      this.sort.ascendingStart = false
    } else {
      this.sort.ascendingStart = true;
    }
  }

  onSelectFinish($event) {
    this.sort.init();
    this.sort.isSelectedFinish = true;
    if (this.sort.ascendingFinish) {
      this.sort.ascendingFinish = false
    } else {
      this.sort.ascendingFinish = true;
    }
  }

  onSelectDescription($event) {
    this.sort.init();
    this.sort.isSelectedDescription = true;
    if (this.sort.ascendingDescription) {
      this.sort.ascendingDescription = false
    } else {
      this.sort.ascendingDescription = true;
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
    this.sterm = "";
    this.sort = new Sort();
    this.sort.isSelectedDate = true;

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
