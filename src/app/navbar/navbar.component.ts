// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Categories } from '../home/category-list/settings';

// External Components
import {
  faShip,
  faHome,
  faTruckPickup,
} from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public faShip = faShip;
  public faHome = faHome;
  public faTruckPickup = faTruckPickup;
  public categories = Categories;
  public category = Categories.None;
  public categoryValue = 'Home';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.categoryChanged.subscribe((category: Categories) => {
      this.category = category;
    });
    this.searchService.categoryValueChanged.subscribe((category: string) => {
      this.categoryValue = category;
    });
  }

  getCurrentPage(): string {
    if (this.category === Categories.None) {
      return 'Home';
    } else {
      return this.categoryValue + 's';
    }
  }
}
