import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BuckitListComponent } from './home/buckit-list/buckit-list.component';
import { CategoryListComponent } from './home/category-list/category-list.component';
import { CategoryComponent } from './home/category-list/category/category.component';
import { BuckitComponent } from './home/buckit-list/buckit/buckit.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
