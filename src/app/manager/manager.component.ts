// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Asset } from '../search/asset-list/asset/settings';

// Settings
import { ManagerService } from './manager.service';

// External Components
import {
  faMinus,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  public faCaretRight = faCaretRight;
  public faCaretDown = faCaretDown;
  public isCollapsed = true;
  public assets: Asset[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {}
}
