// Core
import { Component } from '@angular/core';

// External Components
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faCoffee = faCoffee;
  session = false;
  title = 'buckitz';
}
