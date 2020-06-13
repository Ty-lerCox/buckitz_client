// Core
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private modalState: boolean;

  @Output() modalStateChanged: EventEmitter<any> = new EventEmitter();

  constructor() {}
}
