// Core
import { Component, OnInit } from '@angular/core';

// Services
import { AssetListService } from './asset-list.service';
import { SearchService } from '../search.service';

// Interfaces & Settings
import { Asset, Image } from './asset/settings';
import { Categories } from 'src/app/home/category-list/settings';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {
  public assets: Asset[] = [];
  public assetImages: Image[] = [];
  public category: Categories;

  constructor(
    private route: ActivatedRoute,
    private assetListService: AssetListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.category = this.searchService.getCategory();
    this.assetListService.assetsChanged.subscribe((assets: Asset[]) => {
      this.assets = assets;
    });
    this.assetListService.assetImagesChanged.subscribe((images: Image[]) => {
      this.assetImages = images;
    });
    this.searchService.categoryChanged.subscribe((category: Categories) => {
      this.category = category;
    });
  }

  getImages(asset: Asset): Image[] {
    const result: Image[] = [];
    this.assetImages.forEach((image: Image) => {
      if (image.image_asset_id === asset.asset_id) {
        result.push(image);
      }
    });
    return result;
  }

  getCategory(): Categories {
    return this.category;
  }
}
