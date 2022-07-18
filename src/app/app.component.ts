import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  
  private unsubscribe:Subscription[]=[];

  constructor(public title: Title) { }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(element => {
      element.unsubscribe()
    });    
  }

  ngOnInit() {}

}
