// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Session, User, Job, Jobs } from './settings';

// External Components
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// Services
import { SessionService } from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  public session = false;
  public faPlus = faPlus;
  public faMinus = faMinus;
  public users: User[] = [{}];
  public sessions: Session[] = [];
  public jobs: Job[] = Jobs;
  public isJoining = false;
  public sessionId = null;

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
    this.sessionService.sessionChanged.subscribe((session: boolean) => {
      this.session = session;
      this.users = this.sessionService.getUsers();
    });
  }

  create(): void {
    if (
      this.users[0].user_name === undefined &&
      this.users[0].user_income === undefined &&
      this.users[0].user_job_title === undefined
    ) {
      this.users[0].user_name = 'guest';
      this.users[0].user_income = 100000;
      this.users[0].user_job_title = 'Other';
    }
    this.sessionService.createSession(this.users);
  }

  join(): void {
    if (this.isJoining) {
      this.sessionService.getSession(this.sessionId).subscribe(())
    } else {
      this.isJoining = true;
    }
  }

  save(): void {}

  delete(event: any): void {
    const value = event.split(' ');
    this.sessionService.deleteSession(value[0]);
  }

  addUser(): void {
    this.users.push({});
  }

  removeUser(user: User): void {
    const index = this.users.indexOf(user, 0);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  getTotalIncome(): number {
    let result = 0;
    if (this.users) {
      this.users.forEach((user: User) => {
        if (user.user_income > 0) {
          result += user.user_income;
        }
      });
    }
    return result;
  }
}
