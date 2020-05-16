// Core
import { Component, OnInit } from '@angular/core';

// Services
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  session = false;

  constructor(private sessionService: SessionService) {
    if (this.sessionService.getSessionId() !== null) {
      this.session = true;
    } else {
      this.session = false;
    }
  }

  ngOnInit(): void {
    this.sessionService.sessionChanged.subscribe((session: boolean) => {
      this.session = session;
    });
  }
}
