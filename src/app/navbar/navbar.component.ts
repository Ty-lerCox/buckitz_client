// Core
import { Component, OnInit } from '@angular/core';

// External Components
import { faShip, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faShip = faShip;
  faHome = faHome;

  constructor() {}

  ngOnInit(): void {}
}
