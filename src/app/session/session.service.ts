// Core
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Utility } from '../utility';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Interface & Settings
import { Session, User } from './settings';

// External Components
import { StorageMap } from '@ngx-pwa/local-storage';
import { ManagerService } from '../manager/manager.service';
import { Asset } from '../search/asset-list/asset/settings';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private users: User[] = [];
  private sharedAsset = false;
  private currentSession: Session = {
    id: '',
    session_save_date: '',
  };

  @Output() sessionChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private managerService: ManagerService,
    private storage: StorageMap
  ) {}

  getSession(sessionId: string) {
    this.firestore
      .collection('session')
      .doc(sessionId)
      .snapshotChanges()
      .subscribe((session: any) => {
        this.currentSession = {
          id: session.payload.id,
          ...(session.payload.data() as Session),
        };
        this.storage
          .set('sessionId', this.currentSession.id)
          .subscribe(() => {});
        if (Utility.isDefined(this.currentSession.session_share_asset_id)) {
          this.sharedAsset = true;
        }
        this.firestore
          .collection('user', (ref) =>
            ref.where('user_session_id', '==', this.currentSession.id)
          )
          .snapshotChanges()
          .subscribe((data: any) => {
            this.users = data.map((e: any) => {
              return {
                id: e.payload.doc.id,
                ...(e.payload.doc.data() as User),
              } as User;
            });
            this.sessionChanged.emit(true);
            if (this.sharedAsset) {
              if (
                Utility.isDefined(
                  this.currentSession.session_share_asset_id !== ''
                )
              ) {
                const docRef = this.firestore
                  .collection('asset')
                  .doc(this.currentSession.session_share_asset_id);
                docRef
                  .get()
                  .toPromise()
                  .then((sharedAsset: any) => {
                    this.managerService.modalStateChanged.emit({
                      id: sharedAsset.data().asset_id,
                      images: sharedAsset.data().asset_images,
                      index: this.currentSession.session_share_asset_index,
                    });
                  })
                  .catch((error: any) => {});
              }
            }
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

  shareAssetWithSession(assetID: string, imageIndex: number) {
    if (this.currentSession.id !== '') {
      this.firestore.collection('session').doc(this.currentSession.id).update({
        session_share_asset_id: assetID,
        session_share_asset_index: imageIndex,
      });
    }
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
      if (Utility.isDefined(value)) {
        this.getSession(value);
        this.currentSession.id = value;
        this.sessionChanged.emit(true);
      }
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  updateUsers(): void {
    this.users.forEach((user: User) => {
      if (Utility.isDefined(user.id)) {
        this.firestore
          .doc('user/' + user.id)
          .update(user)
          .catch((err) => {});
      } else {
        this.createUser(user, this.currentSession.id);
      }
    });
  }

  deleteUser(user: User) {
    this.firestore.doc('user/' + user.id).delete();
  }

  getSessionId(): string {
    return this.currentSession.id;
  }

  clearSession() {
    this.storage.clear();
    this.currentSession.id = null;
    this.users = [{}];
    this.sessionChanged.emit(false);
  }

  clearSharedAsset() {
    if (this.sharedAsset) {
      this.firestore.collection('session').doc(this.currentSession.id).update({
        session_share_asset_id: '',
        session_share_asset_index: 0,
      });
      this.sharedAsset = false;
    }
  }
}
