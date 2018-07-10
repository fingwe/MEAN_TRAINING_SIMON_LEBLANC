import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.css']
})
export class TabviewComponent implements OnInit {

  mainTabIsSelected: boolean

  onSelect( $event ): void {
    this.mainTabIsSelected = true;
    setTimeout(()=>{
      this.mainTabIsSelected = false;
    },100);
  }

  constructor() { 
  }

  ngOnInit() {
  }

}
