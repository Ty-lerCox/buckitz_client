// Core
import { Component, OnInit } from '@angular/core';

// Services
import { AssetListService } from './asset-list.service';
import { SearchService } from '../search.service';

// Interfaces & Settings
import { Asset } from './asset/settings';
import {
  Categories,
  CategoriesValues,
} from 'src/app/home/category-list/settings';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {
  public assets: Asset[] = [];
  public category: Categories;
  public categoryValue: string;
  public categoryValues: string[] = CategoriesValues;

  constructor(
    private assetListService: AssetListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.category = this.searchService.getCategory();
    this.assetListService.assetsChanged.subscribe((assets: Asset[]) => {
      this.assets = assets;
    });
    this.searchService.categoryChanged.subscribe((category: Categories) => {
      this.category = category;
    });
    this.searchService.categoryValueChanged.subscribe((category: string) => {
      this.categoryValue = category;
    });
  }
}
