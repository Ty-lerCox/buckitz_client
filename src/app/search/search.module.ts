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
import { ManagerComponent } from '../manager/manager.component';
import { DropdownComponent } from './filter/dropdown/dropdown.component';
import { ManagerAssetComponent } from '../manager/manager-asset/manager-asset.component';
import { ImageModalComponent } from '../manager/image-modal/image-modal.component';

// External Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';

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
    ManagerComponent,
    ManagerAssetComponent,
    ImageModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    GalleryModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class SearchModule {}
