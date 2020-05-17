// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { CategoriesData, Category } from './settings';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = CategoriesData;
  constructor() {}

  ngOnInit(): void {}
}
