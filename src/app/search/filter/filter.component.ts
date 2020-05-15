// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Boat } from './settings';
import { Options } from './button-checkbox/settings';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public desc1: Options = { choices: null };
  public desc2: Options = { choices: null };

  constructor() {
    this.desc1.choices = Boat.desc1;
    this.desc2.choices = Boat.desc2;
  }

  ngOnInit(): void {}

  desc1Changed($event: any): void {
    console.log($event);
  }

  desc2Changed($event: any): void {
    console.log($event);
  }
}
