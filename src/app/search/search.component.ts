import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../home/category-list/settings';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public category: any = Categories.None;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const x = this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
    });
  }
}
