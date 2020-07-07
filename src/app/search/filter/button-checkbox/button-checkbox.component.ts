// Core
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings

@Component({
  selector: 'app-button-checkbox',
  templateUrl: './button-checkbox.component.html',
  styleUrls: ['./button-checkbox.component.scss'],
})
export class ButtonCheckboxComponent implements OnInit {
  @Input() options: string;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  value: any;

  constructor() {}

  ngOnInit(): void {}
}
