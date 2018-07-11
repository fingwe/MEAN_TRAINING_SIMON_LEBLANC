import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.css']
})
export class WelcomeCardComponent implements OnInit {

  pomodoro_link = "https://en.wikipedia.org/wiki/Pomodoro_Technique";

  chrome_link = "https://www.google.com/chrome/";

  title = "About";

  top_content = "Sprint is a minimalist desktop time management application inspired by the ";

  center_content = "Choose a sprint length, enter a brief description of the activity and get things done.";

  lower_content = "Preferred browser: ";

  constructor() { }

  ngOnInit() {
  }

}
