// Core
import { Component, OnInit } from '@angular/core';

// Services
import { AssetListService } from './asset-list.service';

// Interfaces & Settings
import { Asset } from './asset/settings';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];

  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {
    this.assetListService.getAssets('boat').subscribe((data: any) => {
      this.assets = data.map((e: any) => {
        return {
          asset_id: e.payload.doc.id,
          ...(e.payload.doc.data() as Asset),
        } as Asset;
      });
      console.log(this.assets);
    });
  }
}
