// Core
import { Injectable, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings
import { Categories, CategoriesValues } from '../home/category-list/settings';

// Services
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private categories = Categories;
  private categoryValues = CategoriesValues;
  private activeCategory: Categories = Categories.None;
  private activeCategoryValue = null;

  @Output() categoryChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  setCategory(category: Categories) {
    this.activeCategory = category;
    this.activeCategoryValue = this.categoryValues[category];
    this.categoryChanged.emit(this.activeCategoryValue);
  }

  getCategory(): Categories {
    return this.activeCategory;
  }

  getCategoryValue(): string {
    return this.activeCategoryValue;
  }
}
