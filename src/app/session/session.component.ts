// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Session, User } from './settings';

// External Components
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Services
import { SessionService } from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  faPlus = faPlus;
  users: User[] = [{}];
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) {
    this.sessionService.getLocalSession();
  }

  ngOnInit(): void {
    this.sessionService.getSessions().subscribe((data) => {
      this.sessions = data.map((session) => {
        return {
          id: session.payload.doc.id,
          ...(session.payload.doc.data() as Session),
        } as Session;
      });
    });
  }

  create(): void {
    if (this.users[0].user_name === undefined) {
      if (this.users[0].user_income === undefined) {
        if (this.users[0].user_job_title === undefined) {
          this.users[0].user_name = 'guest';
          this.users[0].user_income = 100000;
          this.users[0].user_job_title = 'Other';
        }
      }
    }
    this.sessionService.createSession(this.users);
  }

  join(): void {
    this.sessionService.getLocalSession();
  }

  save(): void {}

  delete(event: any): void {
    const value = event.split(' ');
    this.sessionService.deleteSession(value[0]);
  }
}
