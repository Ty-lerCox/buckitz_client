// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Components
import { SearchComponent } from './search.component';
import { FilterComponent } from './filter/filter.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetComponent } from './asset-list/asset/asset.component';
import { ButtonCheckboxComponent } from './filter/button-checkbox/button-checkbox.component';

// External Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownComponent } from './filter/dropdown/dropdown.component';

const routes: Routes = [
  {
    path: ':category',
    component: SearchComponent,
  },
];

@NgModule({
  declarations: [
    SearchComponent,
    FilterComponent,
    AssetListComponent,
    AssetComponent,
    ButtonCheckboxComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
})
export class SearchModule {}
