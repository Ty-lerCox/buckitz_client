// Core
import { Component, OnInit } from '@angular/core';

// Services
import { SessionService } from './session/session.service';
import { SearchService } from './search/search.service';

// External Components

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public session = false;
  public category = 0;
  public title = 'buckitz';

  constructor(
    private sessionService: SessionService,
    private searchService: SearchService
  ) {
    this.searchService.categoryChanged.subscribe((category: number) => {
      setTimeout(() => {
        this.category = category;
      });
    });
  }

  ngOnInit(): void {
    this.sessionService.sessionChanged.subscribe((session: boolean) => {
      this.session = session;
    });
  }
}
