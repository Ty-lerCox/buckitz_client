// Core
import { Component, OnInit } from '@angular/core';

// Services
import { SessionService } from './session/session.service';

// External Components

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public session = false;
  public title = 'buckitz';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.sessionChanged.subscribe((session: boolean) => {
      this.session = session;
      console.log(session);
    });
  }
}
