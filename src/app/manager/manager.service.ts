// Core
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private modalID: number[] = [];

  @Output() modalStateChanged: EventEmitter<any> = new EventEmitter();

  constructor() {}

  addModalID(val: number) {
    this.modalID.push(val);
  }

  removeModalID(val: number) {
    this.modalID.push(val);
  }
}
