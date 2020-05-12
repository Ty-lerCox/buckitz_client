// Core
import { Component, OnInit } from '@angular/core';

// External Components
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  faPlus = faPlus;

  constructor() {}

  ngOnInit(): void {}
}
