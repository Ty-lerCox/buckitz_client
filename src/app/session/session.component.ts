// Core
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

// Interfaces & Settings
import { Session, User, Job, Jobs } from './settings';
import { jobTitles, Job as Jobb, Groups } from './jobdata';

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
import {
  Categories,
  CategoriesValues,
  Category,
} from '../home/category-list/settings';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  public cars: Asset[] = [];
  public boats: Asset[] = [];
  public categories = Categories;

  constructor(
    private sessionService: SessionService,
    private assetListService: AssetListService,
    private router: Router
  ) {
    this.sessionService.getLocalSession();
  }

  ngOnInit(): void {
    /*
    this.filteredGroupOptions = this.myGroup.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGroups(value))
    );
    this.filteredJobOptions = this.myJob.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterJobs(value))
    );
    console.log(this.filteredJobOptions);*/
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
    let totalIncome = 0;
    let result = 0;
    let userCount = 0;
    if (this.users) {
      this.users.forEach((user: User) => {
        if (user.user_income > 0) {
          result += user.user_income;
          totalIncome += user.user_income;
          userCount = userCount + 1;
        }
      });
    }

    result = result - totalIncome * 0.24; // Mid-tier tax bracket
    result = result - totalIncome * 0.08; // Health Care Costs
    result = result - totalIncome * 0.05; // Entertainment Costs
    result = result - totalIncome * 0.03; // Apparel and Services Costs
    result = result - userCount * 250 * 12; // Food Costs

    this.sessionAssets.forEach((sessionAsset: SessionAsset) => {
      result = result - sessionAsset.session_asset_monthly_cost * 12;
    });
    return result;
  }

  getAssetsCountByCategory(category: Categories): number {
    let result = 0;
    this.sessionAssets.forEach((sessionAsset: SessionAsset) => {
      if (sessionAsset.session_asset_category === CategoriesValues[category]) {
        result = result + 1;
      }
    });
    return result;
  }

  getAssetsCostByCategory(category: Categories): number {
    let result = 0;
    this.sessionAssets.forEach((sessionAsset: SessionAsset) => {
      if (sessionAsset.session_asset_category === CategoriesValues[category]) {
        result = result + sessionAsset.session_asset_monthly_cost * 12;
      }
    });
    return result;
  }

  exitSession() {
    this.sessionService.clearSession();
    this.router.navigateByUrl('/');
  }
  /*
  private _filterGroups(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.myJob.setValue('');
    return this.groups.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterJobs(value: string): string[] {
    const filterValue = value.toLowerCase();
    const jobs = this.allJobs
      .filter((job: Job) => job.Group === this.myGroup.value)
      .map((job: Job) => job.Job);
    return jobs.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public getRanks(job: string): string[] {
    const result: string[] = [];
    const splitJob: string[] = job.split(',');
    const jobName: string = splitJob[0];
    if (splitJob[1] !== '#') {
      result.push(jobName + ' I - $' + splitJob[1]);
    }
    if (splitJob[2] !== '#') {
      result.push(jobName + ' II - $' + splitJob[2]);
    }
    if (splitJob[3] !== '#') {
      result.push(jobName + ' III - $' + splitJob[3]);
    }
    if (splitJob[4] !== '#') {
      result.push(jobName + ' IV - $' + splitJob[4]);
    }
    if (splitJob[5] !== '#') {
      result.push(jobName + ' V - $' + splitJob[5]);
    }
    return result;
  }*/
}
