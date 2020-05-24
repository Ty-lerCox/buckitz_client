// Core
import { Component, OnInit } from '@angular/core';
import { Utility } from '../utility';

// Interfaces & Settings
import {
  Asset,
  SessionAsset,
  Image,
} from '../search/asset-list/asset/settings';

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
import { SearchService } from '../search/search.service';
import { Categories } from '../home/category-list/settings';

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
  public assetImages: Image[] = [];
  public allAssets: Asset[] = [];
  public sessionAssets: SessionAsset[] = [];
  public isSearching = false;
  public currentImg = 0;
  public currentImgSrc = '';
  public modalState = false;

  constructor(
    private managerService: ManagerService,
    private assetListService: AssetListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.managerService.modalStateChanged.subscribe((state: boolean) => {
      this.modalState = state;
    });
    this.assetListService.assetsChanged.subscribe((assets: Asset[]) => {
      this.allAssets = assets;
    });
    this.assetListService.assetImagesChanged.subscribe((images: Image[]) => {
      this.assetImages = images;
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
    this.searchService.categoryChanged.subscribe((category: Categories) => {
      if (Utility.isDefined(category)) {
        setTimeout(() => {
          this.isSearching = true;
        });
      }
    });
    this.assets.forEach((asset: Asset) => {
      asset.asset_current_img = 0;
    });
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

  getAssetImages(asset: Asset): Image[] {
    const result: Image[] = [];
    this.assetImages.forEach((image: Image) => {
      if (image.image_asset_id === asset.asset_id) {
        result.push(image);
      }
    });
    return result;
  }
}
