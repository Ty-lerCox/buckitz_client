// Core
import { Injectable, EventEmitter, Output } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Interface & Settings
import { Session, User } from './settings';

// External Components
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionId = '';
  private users: User[] = [];

  @Output() sessionChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private storage: StorageMap
  ) {}

  getSessions() {
    return this.firestore.collection('session').snapshotChanges();
  }

  async createSession(users: User[]) {
    return this.firestore
      .collection('session')
      .add({ session_save_date: Date.now() })
      .then((docRef) => {
        users.forEach((user: User) => {
          this.createUser(user, docRef.id);
        });
        this.sessionId = docRef.id;
        this.storage.set('sessionId', docRef.id).subscribe(() => {});
        this.users = users;
        this.storage.set('users', users).subscribe(() => {});
        this.sessionChanged.emit(true);
      })
      .catch((error) => console.error('Error adding document: ', error));
  }

  updateSession(session: Session) {
    delete session.id;
    this.firestore.doc('session/' + session.id).update(session);
  }

  deleteSession(sessionId: string) {
    this.firestore.doc('session/' + sessionId).delete();
  }

  createUser(user: User, id: string) {
    user.user_session_id = id;
    return this.firestore.collection('user').add(user);
  }

  getLocalSession(): void {
    this.storage.get('sessionId').subscribe((value: string) => {
      this.sessionId = value;
      if (value !== null) {
        this.storage.get('users').subscribe((users: User[]) => {
          this.users = users;
          this.sessionChanged.emit(true);
        });
      }
    });
  }

  getUsers(): User[] {
    return this.users;
  }
}
