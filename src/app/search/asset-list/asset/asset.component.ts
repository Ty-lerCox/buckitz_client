// Core
import { Component, OnInit, Input } from '@angular/core';

// Interfaces & Settings
import { Asset } from './settings';

// External Components
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AssetService } from './asset.service';
import { AssetListService } from '../asset-list.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {
  public faPlus = faPlus;

  @Input() asset: Asset;

  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {}

  add(): void {
    this.assetListService.addAssetToSession(this.asset);
  }
}
