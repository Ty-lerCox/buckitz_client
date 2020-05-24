// Core
import { Component, OnInit, Input } from '@angular/core';

// Interfaces & Settings
import { Asset, Image } from './settings';
import { Categories } from '../../../home/category-list/settings';

// External Components
import { faPlus, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { AssetService } from './asset.service';
import { AssetListService } from '../asset-list.service';
import { SearchService } from '../../search.service';

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
  @Input() images: Image[];
  @Input() category: Categories;

  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {
    this.currentImgSrc = this.images.find(
      (img: Image) => img.image_index === 0
    ).image_asset_src;
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
