// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { CategoriesData, Category } from './settings';
import { AssetListService } from 'src/app/search/asset-list/asset-list.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = CategoriesData;
  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {
    this.assetListService.getSessionAssets();
  }
}
