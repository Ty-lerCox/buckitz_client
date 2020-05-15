// Core
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings
import { Options } from './settings';

@Component({
  selector: 'app-button-checkbox',
  templateUrl: './button-checkbox.component.html',
  styleUrls: ['./button-checkbox.component.scss'],
})
export class ButtonCheckboxComponent implements OnInit {
  @Input() options: Options;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  value: any;

  constructor() {}

  ngOnInit(): void {}
}
