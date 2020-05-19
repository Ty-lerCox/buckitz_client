// Core
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings
import { DropdownOptions } from './settings';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() title: string;
  @Input() options: DropdownOptions;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
