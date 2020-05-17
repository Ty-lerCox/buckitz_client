// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Boat } from './settings';
import { CheckboxOptions } from './button-checkbox/settings';
import { DropdownOptions } from './dropdown/settings';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public desc1: CheckboxOptions = { choices: null };
  public desc2: CheckboxOptions = { choices: null };
  public desc3: DropdownOptions = { title: null, choices: null };
  public desc4: DropdownOptions = { title: null, choices: null };

  constructor() {
    this.desc1.choices = Boat.desc1;
    this.desc2.choices = Boat.desc2;
    this.desc3.choices = Boat.desc3;
    this.desc3.title = Boat.desc3Title;
    this.desc4.choices = Boat.desc4;
    this.desc4.title = Boat.desc4Title;
  }

  ngOnInit(): void {}

  desc1Changed($event: any): void {
    console.log($event);
  }

  desc2Changed($event: any): void {
    console.log($event);
  }

  desc3Changed($event: any): void {
    console.log($event);
  }

  desc4Changed($event: any): void {
    console.log($event);
  }
}
