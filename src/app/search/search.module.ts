import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetComponent } from './asset-list/asset/asset.component';



@NgModule({
  declarations: [FilterComponent, AssetListComponent, AssetComponent],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
