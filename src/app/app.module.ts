// Core
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BuckitListComponent } from './home/buckit-list/buckit-list.component';
import { CategoryListComponent } from './home/category-list/category-list.component';
import { CategoryComponent } from './home/category-list/category/category.component';
import { BuckitComponent } from './home/buckit-list/buckit/buckit.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SessionComponent,
    FooterComponent,
    WelcomeComponent,
    BuckitListComponent,
    CategoryListComponent,
    CategoryComponent,
    BuckitComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
