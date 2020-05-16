// Core
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings
import { CheckboxOptions } from './settings';

@Component({
  selector: 'app-button-checkbox',
  templateUrl: './button-checkbox.component.html',
  styleUrls: ['./button-checkbox.component.scss'],
})
export class ButtonCheckboxComponent implements OnInit {
  @Input() options: CheckboxOptions;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  value: any;

  constructor() {}

  ngOnInit(): void {}
}
