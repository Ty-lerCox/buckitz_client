// Core
import { Component, OnInit, Input } from '@angular/core';

// Interfaces & Settings
import { Asset } from './settings';
import { Categories } from '../../../home/category-list/settings';

// External Components
import { faPlus, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { AssetService } from './asset.service';
import { AssetListService } from '../asset-list.service';
import { SearchService } from '../../search.service';
import { Utility } from 'src/app/utility';
import {
  ScrollToService,
  ScrollToConfigOptions,
} from '@nicky-lenaers/ngx-scroll-to';
import { ManagerService } from 'src/app/manager/manager.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {
  public faPlus = faPlus;
  public faCaretRight = faCaretRight;
  public currentImg = 0;
  public currentImgSrc = '';
  public categories = Categories;

  @Input() asset: Asset;
  @Input() category: Categories;

  constructor(
    private assetListService: AssetListService,
    private scrollToService: ScrollToService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.currentImgSrc = this.asset.asset_images[0];
  }

  add(): void {
    this.assetListService.addAssetToSession(this.asset);
    const config: ScrollToConfigOptions = {
      target: 'manager',
    };
    this.scrollToService.scrollTo(config);
  }

  nextImage(): void {
    if (this.asset.asset_images.length === this.currentImg + 1) {
      this.currentImg = 0;
    } else {
      this.currentImg = this.currentImg + 1;
    }
    this.currentImgSrc = this.asset.asset_images[this.currentImg];
  }

  openImageModal() {
    this.managerService.modalStateChanged.emit({
      id: this.asset.asset_id,
      images: this.asset.asset_images,
    });
  }
}
