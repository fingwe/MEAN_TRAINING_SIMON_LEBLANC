import { Component, OnInit, TemplateRef, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PastSprint } from '../../models/PastSprint';
import { Status } from '../../models/Status';
import { Interval } from '../../models/Interval';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ViewChild } from '@angular/core';
import { SprintService } from '../sprint.service';


@Component({
  selector: 'app-new-sprint-working',
  templateUrl: './new-sprint-working.component.html',
  styleUrls: ['./new-sprint-working.component.css']
})
export class NewSprintWorkingComponent implements OnInit, OnChanges {

  @ViewChild('completedSprint') completedSprint : TemplateRef<any>;

  modalRef: BsModalRef;

  progressPercent: number;

  interval: Interval;

  runningSprint: PastSprint;

  asbsoluteSprint: PastSprint;

  @Input() injectedSprint: PastSprint;

  timerStopTimeStamp: number;

  @Output() initRequestEvent = new EventEmitter<boolean>();

  /**
   * Event method that handle the injection of the sprint from parent module
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      if (propName === "injectedSprint") {
        this.injectedSprint = chng.currentValue;
        console.log(this.injectedSprint);
        this.absoluteSprintInit();
        this.runningSprintInit();
        this.timerStart();
      }
    }
  }

  /**
   * Send event request to parent for reseting page
   */
  sendInitRequest() {
    this.initRequestEvent.emit(true);
  }

  /**
   * Method that saves in the database the sprints
   */
  saveSprint(): void{
    this.sprintService.addSprint(this.asbsoluteSprint).subscribe();
  }

  /**
   * Method that hanlde the stoping event actions
   * @param event 
   * @param stopDialog 
   */
  onStop(event,stopDialog: TemplateRef<any>) {
    this.timerStop();
    this.modalRef = this.modalService.show(stopDialog);
  }

  /**
   * Method that handle the resuming event actions
   * @param event 
   */
  onResume(event) {
    this.modalService.hide(1);
    this.timerRestart();
  }

  /**
   * Method that handle the abort event actions
   * @param event 
   */
  onAbort(event) {
    this.modalService.hide(1);
    setTimeout(() => {
      this.timerAbort();
      this.interval.isFinished = true;
    },750);

  }

  /**
   * Method that manage the onFinished event
   */
  onFinished() {

    this.modalRef = this.modalService.show(this.completedSprint);
  }

  /**
   * 
   * initialize the timer object
   * 
   * @param sprint a sprint object 
   */
  runningSprintInit(sprint?: PastSprint) {
    this.runningSprint = new PastSprint();
    this.runningSprint.duration = this.asbsoluteSprint.duration - this.asbsoluteSprint.progress;
    this.runningSprint.progress = 0;
    this.runningSprint.notify = false;
    this.runningSprint.user = this.asbsoluteSprint.user;
    this.runningSprint.createdAt = new Date();
    this.interval.isFinished = false;
  }

  /**
   * 
   * initialize the timer object
   * 
   * @param sprint a sprint object 
   */
  absoluteSprintInit() {
    this.asbsoluteSprint = new PastSprint();
    this.asbsoluteSprint.name = this.injectedSprint.name || "mySprint";  
    this.asbsoluteSprint.duration = this.injectedSprint.duration || 5000;
    this.asbsoluteSprint.status = new Status("initial").getType();

    this.asbsoluteSprint.progress = 0;
    this.asbsoluteSprint.description = this.injectedSprint.description || "default sprint";
    this.asbsoluteSprint.notify = false;
    this.asbsoluteSprint.user = this.injectedSprint.user;
    this.asbsoluteSprint.createdAt = new Date();

    this.progressPercent = 0;
    this.interval.isFinished = false;
  }

  /**
   * format progressPercent depending of duration
   */
  formatProgressPercent() {
    if (this.asbsoluteSprint.duration > 60000) {
      this.progressPercent = this.progressPercent = parseFloat(this.progressPercent.toFixed(1));
    } else {
      this.progressPercent = parseFloat(Math.round((this.asbsoluteSprint.progress/this.asbsoluteSprint.duration)*100).toFixed(1));
    }
  }

  /**
   * Manage the work of the timer
   */
  timerWork() {
    this.interval.runner = setInterval(()=>{
      this.interval.isRunning = true;
      let diff = Date.now()-(Date.parse(this.runningSprint.startedAt.toString())+this.runningSprint.progress);
      this.runningSprint.progress+=diff;
      this.asbsoluteSprint.progress+=diff;
      if (this.runningSprint.progress < this.runningSprint.duration) {
        //
        this.progressPercent = (this.asbsoluteSprint.progress/this.asbsoluteSprint.duration)*100;
        this.formatProgressPercent();
      } else {
        this.runningSprint.progress = this.runningSprint.duration;
        this.asbsoluteSprint.progress = this.asbsoluteSprint.duration;
        this.progressPercent = 100;
        this.timerEnd();
      }
      
    },100);
  };

  /**
   * Manage the start of the timer
   */
  timerStart() {
    
    this.asbsoluteSprint.startedAt = new Date();
    this.runningSprint.startedAt = this.asbsoluteSprint.startedAt;
    this.timerWork();
  }


  /**
   * Manage the stop of the timer
   */
  timerStop() {
    clearInterval(this.interval.runner);
    this.interval.isRunning = false;
  }

  /**
   * Manage the restart of the timer
   */
  timerRestart() {
    if (!this.interval.isRunning) {
      this.runningSprintInit();
      this.runningSprint.startedAt = new Date();
      this.timerWork();
    }
  }

  /**
   * Manage the abort of the timer
   */
  timerAbort() {
    clearInterval(this.interval.runner);
    this.interval.isRunning = false;
    this.asbsoluteSprint.finishedAt = new Date();
    this.asbsoluteSprint.status = new Status(`Cancelled (at ${this.progressPercent}%)`).getType();
    this.interval.isFinished = true;
    this.saveSprint();
    this.onFinished();
    setTimeout(()=>{
      this.sendInitRequest();
      document.getElementById('past_sprint_tab-link').click();
    },2000);

  }

  /**
   * Manage the natural end of the timer
   */
  timerEnd() {
    clearInterval(this.interval.runner);
    this.interval.isRunning = false;
    this.interval.isFinished = true;
    this.asbsoluteSprint.finishedAt = new Date();
    this.asbsoluteSprint.status = new Status('Completed').getType();
    this.saveSprint();
    this.onFinished();
    setTimeout(()=>{
      this.sendInitRequest();
      document.getElementById('past_sprint_tab-link').click();
    },2000);
  }


  /**
   * Constructor method
   * set the inital stub sprint for now
   */
  constructor(private modalService: BsModalService, private router: Router, private sprintService: SprintService) {
    this.interval = new Interval();
    this.interval.isRunning = false;
    

  }

  ngOnInit() {
  }

}
