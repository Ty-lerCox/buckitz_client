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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public faShip = faShip;
  public faHome = faHome;
  public faTruckPickup = faTruckPickup;
  public Categories = Categories;

  constructor() {}

  ngOnInit(): void {}
}
