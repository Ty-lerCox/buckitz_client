// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Asset, SessionAsset } from '../search/asset-list/asset/settings';

// Settings
import { ManagerService } from './manager.service';

// Services
import { AssetListService } from '../search/asset-list/asset-list.service';

// External Components
import {
  faMinus,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../session/session.service';
import { Session } from 'protractor';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  public faCaretRight = faCaretRight;
  public faCaretDown = faCaretDown;
  public isCollapsed = true;
  public assets: Asset[] = [];
  public allAssets: Asset[] = [];
  public sessionAssets: SessionAsset[] = [];

  constructor(
    private managerService: ManagerService,
    private assetListService: AssetListService
  ) {}

  ngOnInit(): void {
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
          if (assetFound !== null) {
            this.assets.push(assetFound);
          }
        });
      }
    );
  }

  remove(asset: Asset): void {
    const index = this.assets.indexOf(asset, 0);
    if (index > -1) {
      this.assets.splice(index, 1);
      const sessionAsset: SessionAsset = this.sessionAssets.find(
        (foundSessionAsset: SessionAsset) =>
          foundSessionAsset.session_asset_asset_id === asset.asset_id
      );
      this.assetListService.deleteAsset(sessionAsset);
    }
  }
}
