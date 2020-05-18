// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Session, User, Job, Jobs } from './settings';

// External Components
import {
  faPlus,
  faMinus,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { SessionService } from './session.service';
import { AssetListService } from '../search/asset-list/asset-list.service';
import { SessionAsset, Asset } from '../search/asset-list/asset/settings';
import { Utility } from '../utility';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  public session = false;
  public faPlus = faPlus;
  public faCaretRight = faCaretRight;
  public faCaretDown = faCaretDown;
  public faMinus = faMinus;
  public users: User[] = [{}];
  public sessions: Session[] = [];
  public jobs: Job[] = Jobs;
  public isJoining = false;
  public sessionId = null;
  public isCollapsed = false;
  public sessionAssets: SessionAsset[] = [];
  public assets: Asset[] = [];
  public allAssets: Asset[] = [];

  constructor(
    private sessionService: SessionService,
    private assetListService: AssetListService
  ) {
    this.sessionService.getLocalSession();
  }

  ngOnInit(): void {
    this.sessionService.sessionChanged.subscribe((session: boolean) => {
      this.session = session;
      this.sessionId = this.sessionService.getSessionId();
      this.users = this.sessionService.getUsers();
    });
    this.assetListService.assetsChanged.subscribe((assets: Asset[]) => {
      this.allAssets = assets;
    });
    this.assetListService.sessionAssetsChanged.subscribe(
      (sessionAssets: SessionAsset[]) => {
        this.sessionAssets = sessionAssets;
        this.assets = [];
        sessionAssets.forEach((sessionAsset: SessionAsset) => {
          const assetFound: Asset = this.allAssets.find(
            (asset: Asset) =>
              asset.asset_id === sessionAsset.session_asset_asset_id
          );
          if (Utility.isDefined(assetFound)) {
            this.assets.push(assetFound);
          }
        });
      }
    );
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
      this.sessionService.getSession(this.sessionId);
      this.isJoining = false;
    } else {
      this.isJoining = true;
    }
  }

  save(): void {
    this.sessionService.updateUsers();
  }

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
      this.sessionService.deleteUser(user);
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
    this.assets.forEach((asset: Asset) => {
      result = result - asset.asset_monthly_maintance * 12;
    });
    return result;
  }

  exitSession() {
    this.sessionService.clearSession();
  }
}
