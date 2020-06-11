// Core
import { Injectable, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings
import { Image } from '../search/asset-list/asset/settings';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private modalState: boolean;

  @Output() modalStateChanged: EventEmitter<Image[]> = new EventEmitter();

  constructor() {}
}
