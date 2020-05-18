// Core
import { Component, OnInit } from '@angular/core';

// Services

// External Components

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public session = false;
  public category = '';
  public title = 'buckitz';

  constructor() {}

  ngOnInit(): void {}
}
