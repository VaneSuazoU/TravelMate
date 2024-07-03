import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  company: string = '';
  startYear: number = 0;
  currentlyWorking: boolean = false;
  endYear: number = 0;
  position: string = '';

  constructor() { }

  ngOnInit() {
    console.log('Hola')
  }
}