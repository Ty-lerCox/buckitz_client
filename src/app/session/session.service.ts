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

  getSession(sessionId: string) {
    let id = '';
    this.firestore
      .collection('session')
      .doc(sessionId)
      .get()
      .subscribe((session: any) => {
        id = session.id;
        this.firestore
          .collection('user', (ref) => ref.where('user_session_id', '==', id))
          .snapshotChanges()
          .subscribe((data: any) => {
            this.users = data.map((e) => {
              return {
                id: e.payload.doc.id,
                ...(e.payload.doc.data() as User),
              } as User;
            });
            this.sessionId = id;
            this.sessionChanged.emit(true);
            this.storage.set('sessionId', id).subscribe(() => {});
          });
      });
  }

  async createSession(users: User[]) {
    return this.firestore
      .collection('session')
      .add({ session_save_date: Date.now() })
      .then((docRef) => {
        users.forEach((user: User) => {
          this.createUser(user, docRef.id);
        });
        this.getSession(docRef.id);
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
      if (this.isDefined(value)) {
        this.getSession(value);
      }
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  updateUsers(): void {
    this.users.forEach((user: User) => {
      if (this.isDefined(user.id)) {
        this.firestore
          .doc('user/' + user.id)
          .update(user)
          .catch((err) => {});
      } else {
        this.createUser(user, this.sessionId);
      }
    });
  }

  deleteUser(user: User) {
    this.firestore.doc('user/' + user.id).delete();
  }

  isDefined<T>(value: T | undefined | null): value is T {
    return (value as any) !== undefined && (value as any) !== null;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  clearSession() {
    this.storage.clear();
    this.sessionId = null;
    this.users = [{}];
    this.sessionChanged.emit(false);
  }
}
