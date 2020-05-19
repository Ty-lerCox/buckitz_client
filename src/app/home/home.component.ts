// Core
import { Component, OnInit } from '@angular/core';

// Services
import { SessionService } from '../session/session.service';
import { Utility } from '../utility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  session = false;

  constructor(private sessionService: SessionService) {
    if (Utility.isDefined(this.sessionService.getSessionId())) {
      this.session = true;
    }
  }

  ngOnInit(): void {
    this.sessionService.sessionChanged.subscribe((session: boolean) => {
      this.session = session;
    });
  }
}
