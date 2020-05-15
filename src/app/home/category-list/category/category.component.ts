// Core
import { Component, OnInit, Input } from '@angular/core';

// Interfaces & Settings
import { Category } from '../settings';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  constructor() {}

  ngOnInit(): void {}
}
