// Core
import { Component, OnInit } from '@angular/core';
import { Utility } from '../utility';

// Interfaces & Settings
import { Asset, SessionAsset } from '../search/asset-list/asset/settings';

// Settings
import { ManagerService } from './manager.service';

// Services
import { AssetListService } from '../search/asset-list/asset-list.service';

// Components
import { ImageModalComponent } from './image-modal/image-modal.component';

// External Components
import {
  faMinus,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../search/search.service';
import { Categories, CategoriesValues } from '../home/category-list/settings';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
  public category: Categories;
  public categoryValue: string;
  public categoryValues: string[] = CategoriesValues;
  public isSearching = false;
  public currentImg = 0;
  public currentImgSrc = '';
  public modalState = false;

  constructor(
    private managerService: ManagerService,
    private assetListService: AssetListService,
    private searchService: SearchService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.category = this.searchService.getCategory();
    this.categoryValue = this.searchService.getCategoryValue();
    this.managerService.modalStateChanged.subscribe((data: any) => {
      this.openDialog(data.id, data.images, data.index);
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
    this.searchService.categoryValueChanged.subscribe((category: string) => {
      this.categoryValue = category;
    });
    this.searchService.categoryChanged.subscribe((category: Categories) => {
      this.category = category;
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

  getSuggestedYearlyIncome(): number {
    let result = 0;
    this.assets.forEach((asset: Asset) => {
      result = result + asset.asset_monthly_maintance;
    });
    result = (result / 0.3) * 12;
    return result;
  }

  openDialog(assetID: string, images: string[], index: number) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100vh',
      width: '100vw',
      maxWidth: '',
      panelClass: 'full-screen-modal',
      data: {
        id: assetID,
        dataImages: images,
        index,
      },
    };
    this.matDialog.open(ImageModalComponent, dialogConfig);
  }
}
