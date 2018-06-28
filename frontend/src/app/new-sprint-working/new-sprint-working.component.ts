import { Component, OnInit } from '@angular/core';
import { PastSprint } from '../../models/PastSprint';
import { Status } from '../../models/Status';
import { ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-new-sprint-working',
  templateUrl: './new-sprint-working.component.html',
  styleUrls: ['./new-sprint-working.component.css']
})
export class NewSprintWorkingComponent implements OnInit {

  progressPercent: number;

  sprint: PastSprint;

  public onClick() {
    let seconds = setInterval(() => {
      this.sprint.progress++;
      if (this.progressPercent < (Math.floor(((this.sprint.progress/this.sprint.duration)*100)))) {
        this.progressPercent = Math.floor(((this.sprint.progress/this.sprint.duration)*100));
      }
    },999);

    setTimeout(() => {
      clearInterval(seconds);
    },this.sprint.duration);
  };

  constructor() {
    this.sprint = new PastSprint();
    this.sprint.name = "mySprint";  
    this.sprint.duration = 25000;
    this.sprint.status = new Status("initial");

    this.sprint.progress = 0;
    this.sprint.description = "a simple timer";
    this.sprint.notify = false;
    this.sprint.user = 555;
    this.progressPercent = 0;

  }

  ngOnInit() {
  }

}
