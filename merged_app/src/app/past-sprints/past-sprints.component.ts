import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PastSprint } from '../../models/PastSprint';
import { SprintService } from '../sprint.service';
import { SprintTypeData } from '../data/SprintTypeData';
import { Sort } from '../../models/Sort';
import { CheckBox } from '../../models/checkbox';
import { AuthService } from '../auth.service';

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

  totalItems: number;

  sort: Sort;

  skip: number;

  top: number;

  showPageSelection: Boolean;

  currentPage: number;

  relativeTotalItems: number;

  selectedField: string;

  order: string;

  profile: any;

  currentUser: string;

  pageManager(): void {
    if (this.totalItems > this.top ) {
      this.showPageSelection = true;
    } else {
      this.showPageSelection = false;
    }
    this.relativeTotalItems = Math.round((this.totalItems / this.top)) * 10
    
  }

  // set the change page event
  pageChanged(event: any) {
    this.skip = this.top * (event.page-1);
    this.updateSprints();
  }

  // set top value with graphic control
  setTop(value: number,$event): void {
    this.top = value;
    this.updateSprints();
    this.sterm = null;
  }

  // get the sprint count from the service
  updateSprints(field?: string, order?: string, top?: number, skip?: number): void {
    this.sprintService.countSprints(this.currentUser).subscribe(count => {
      this.totalItems = count
      this.pageManager();
      this.getPagedSortedSprints(field || this.selectedField ,this.order || this.order, top || this.top,skip || this.skip);
    });
  }

  // get all the sprints from the service
  getSprints(): void {
    this.sprintService.getSprints(this.currentUser).subscribe(sprints => this.pastSprints = sprints);
  }

  // get the paged sprints from the service
  getPagedSortedSprints(field: string, order: string, top?: number, skip?: number): void {
    this.sprintService.getPagedSortedSprints(field,this.order,top || this.top,skip || this.skip, this.currentUser).subscribe(sprints => this.pastSprints = sprints);
  }

  // delete all sprints command
  deleteSprints(): void {
    this.sprintService.deleteSprints(this.currentUser).subscribe(()=>{
      this.getSprints();
    });
  }

  // manage on click event on the delete all button
  onClickDeleteButton($event) {
    this.deleteSprints();
  }

  // manage the click event on selecting the length column
  onSelectLength($event) {
    if (this.sort.ascendingLength) {
      this.sort.ascendingLength = false
      this.order = 'descending';
    } else {
      this.sort.ascendingLength = true;
      this.order = 'ascending';
      this.selectedField = 'name'
    }
    this.getPagedSortedSprints(this.selectedField,this.order);
  }

  // manage the click event on selecting the status column
  onSelectStatus($event) {
    
    if (this.sort.ascendingStatus) {
      this.sort.ascendingStatus = false;
      this.order = 'descending';
    } else {
      this.sort.ascendingStatus = true;
      this.order = 'ascending';
      this.selectedField = 'status';
    }
    this.getPagedSortedSprints(this.selectedField,this.order);
  }

  // manage the click event on selection the data column
  onSelectDate($event) {
    
    if (this.sort.ascendingDate) {
      this.sort.ascendingDate = false;
      this.order = 'descending';
    } else {
      this.sort.ascendingDate = true;
      this.order = 'ascending';
      this.selectedField ='createdAt';
    }
    this.getPagedSortedSprints(this.selectedField,this.order);
  }

  // manage the click event on the start column
  onSelectStart($event) {
    
    if (this.sort.ascendingStart) {
      this.sort.ascendingStart = false;
      this.order = 'descending';
    } else {
      this.sort.ascendingStart = true;
      this.order = 'ascending';
      this.selectedField = 'startedAt';
    }
    this.getPagedSortedSprints(this.selectedField,this.order);
  }

  // manage the click event on the finish column
  onSelectFinish($event) {
    
    if (this.sort.ascendingFinish) {
      this.sort.ascendingFinish = false;
      this.order = 'descending';
    } else {
      this.sort.ascendingFinish = true;
      this.order = 'ascending';
      this.selectedField = 'finishedAt';
    }
    this.getPagedSortedSprints(this.selectedField,this.order);
  }

  // manage the click event on the description column
  onSelectDescription($event) {
    
    if (this.sort.ascendingDescription) {
      this.sort.ascendingDescription = false;
      this.order = 'descending';
    } else {
      this.sort.ascendingDescription = true;
      this.order = 'ascending';
      this.selectedField = 'description';
    }
    this.getPagedSortedSprints(this.selectedField,this.order);
  }

  constructor(private sprintService: SprintService, private authService: AuthService) {
    this.sprintTypes = new SprintTypeData();
    this.sterm = "";
    this.sort = new Sort();
    this.sort.isSelectedDate = true;
    this.top = 5;
    this.skip = 0;
    this.selectedField = 'createdAt';
    this.order = 'ascending';
    this.currentUser = this.authService.getUserTag();
    
  }

  ngOnInit() {
    this.updateSprints();
    
    setInterval(()=>{
      if (this.pastSprintSelected) {
        this.updateSprints();
        this.pastSprintSelected = false;
      }
      if ( this.profile == null) {
        this.profile = JSON.stringify(this.currentUser);
      }

      this.currentUser = this.authService.getUserTag();
    },25);
  }

}
