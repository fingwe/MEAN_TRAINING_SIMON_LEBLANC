import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PastSprint } from '../../models/PastSprint';
import { Status } from '../../models/Status';
import { Interval } from '../../models/Interval';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-new-sprint-working',
  templateUrl: './new-sprint-working.component.html',
  styleUrls: ['./new-sprint-working.component.css']
})
export class NewSprintWorkingComponent implements OnInit {

  modalRef: BsModalRef;

  progressPercent: number;

  interval: Interval;

  finishedTemplate: TemplateRef<any>;

  sprint: PastSprint;

  /**
   * Method that listen to a click event and start a timer
   * each seconds, adds one second to sprint.progess 
   * and
   * update progressPercent to the right percentage of progress
   * 
   * @param event the click event
   */
  onClickStart(event) {
    this.timerStart();
  }

  onStop(event,stopDialog: TemplateRef<any>) {
    this.timerStop();
    this.modalRef = this.modalService.show(stopDialog);
  }

  onResume(event) {
    this.modalService.hide(1);
    this.timerRestart();
  }

  onAbort(event) {
    this.modalService.hide(1)
    this.timerAbort();
    this.interval.isFinished = true;
  }

  onFinishedListenner() {
    if (this.interval.isFinished) {
      this.onFinished();
    }
   return this.interval.isFinished;
  }

  importFinishDialog(event,finished: TemplateRef<any>) {
    this.finishedTemplate = finished;
  }

  onFinished() {

    //this.modalRef = this.modalService.show(this.finishedTemplate);
  }

  /**
   * 
   * initialize the timer object
   * 
   * @param sprint a sprint object 
   */
  timerInit(sprint?: PastSprint) {
    this.sprint = new PastSprint();
    this.sprint.name = "mySprint";  
    this.sprint.duration = 3000;
    this.sprint.status = new Status("initial");

    this.sprint.progress = 0;
    this.sprint.description = "a simple timer";
    this.sprint.notify = false;
    this.sprint.user = 555;
    this.progressPercent = 0;
    this.sprint.createdAt = new Date();
    this.interval.isFinished = false;
  }

  /**
   * Manage the work of the timer
   */
  timerWork() {
    this.interval.runner = setInterval(()=>{
      this.interval.isRunning = true;
      let diff = Date.now()-(Date.parse(this.sprint.startedAt.toString())+this.sprint.progress);
      this.sprint.progress+=diff;
      if (this.sprint.progress < this.sprint.duration) {
        this.progressPercent = parseFloat(Math.round((this.sprint.progress/this.sprint.duration)*100).toFixed(1));
      } else {
        this.sprint.progress = this.sprint.duration;
        this.progressPercent = 100;
        this.timerEnd();
      }
    },1);
  };

  /**
   * Manage the start of the timer
   */
  timerStart() {
    
    if (this.interval.isRunning) {
      this.timerEnd();
      this.timerInit();
    }
    this.sprint.startedAt = new Date();
    this.sprint.finishedAt = new Date(Date.parse(this.sprint.startedAt.toString())+this.sprint.duration);
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
      this.timerWork();
    }
  }

  /**
   * Manage the abort of the timer
   */
  timerAbort() {
    clearInterval(this.interval.runner);
    this.interval.isRunning = false;
    this.sprint.finishedAt = new Date();
    this.interval.isFinished = true;
    this.router.navigateByUrl('/sprints');

  }

  /**
   * Manage the natural end of the timer
   */
  timerEnd() {
    clearInterval(this.interval.runner);
    this.interval.isRunning = false;
    this.interval.isFinished = true;
  }

  /**
   * Method that returns a formated progress for styling the progess bar progress
   */
  getProgress() {
    return `${this.progressPercent}rem`;
  }

  /**
   * Constructor method
   * set the inital stub sprint for now
   */
  constructor(private modalService: BsModalService, private router: Router) {
    this.interval = new Interval();
    this.interval.isRunning = false;
    this.timerInit();
    this.timerStart();

  }

  ngOnInit() {
  }

}
