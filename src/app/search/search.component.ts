// Core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Interfaces & Settings
import { Categories } from '../home/category-list/settings';

// Services
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public category: any = Categories.None;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.searchService.setCategory(+params.get('category'));
    });
  }
}
