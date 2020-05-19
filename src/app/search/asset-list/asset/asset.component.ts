// Core
import { Component, OnInit, Input } from '@angular/core';

// Interfaces & Settings
import { Asset, Image } from './settings';

// External Components
import {
  faPlus,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import { AssetService } from './asset.service';
import { AssetListService } from '../asset-list.service';

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

  @Input() asset: Asset;
  @Input() images: Image[];

  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {
    this.currentImgSrc = this.images[0].image_asset_src;
  }

  add(): void {
    this.assetListService.addAssetToSession(this.asset);
  }

  nextImage(): void {
    if (this.images.length === this.currentImg + 1) {
      this.currentImg = 0;
    } else {
      this.currentImg = this.currentImg + 1;
    }
    this.currentImgSrc = this.images[this.currentImg].image_asset_src;
  }
}
