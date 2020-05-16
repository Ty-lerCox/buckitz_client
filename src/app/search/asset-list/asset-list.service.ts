// Core
import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// External Components
import { StorageMap } from '@ngx-pwa/local-storage';

// Interfaces & Settings
import { Asset, SessionAsset } from './asset/settings';
import { SessionService } from 'src/app/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AssetListService {
  constructor(
    private firestore: AngularFirestore,
    private storage: StorageMap,
    private sessionService: SessionService
  ) {}

  getAssets(category: string) {
    return this.firestore
      .collection('asset', (ref) => ref.where('asset_category', '==', category))
      .snapshotChanges();
  }

  addAssetToSession(asset: Asset) {
    const sessionAsset: SessionAsset = {
      session_asset_session_id: this.sessionService.getSessionId(),
      session_asset_asset_id: asset.asset_id,
    };
    this.firestore.collection('sessionAsset').add(sessionAsset);
    console.log('test');
  }

  addAsset() {
    const asset: Asset = {
      asset_category: 'boat',
      asset_cost: 4500000,
      asset_desc_1: 'used',
      asset_desc_2: 'sail',
      asset_desc_3: '157',
      asset_desc_4: 'Newport, RI',
      asset_desc_5: 'Diesel',
      asset_img_01:
        'https://images.boattrader.com/resize/1/82/88/6818288_20180823153122449_1_LARGE.jpg?w=1600&h=800&t=1535145392000',
      asset_img_02:
        'https://images.boattrader.com/resize/1/82/88/6818288_20180823120223156_1_LARGE.jpg?w=1600&h=800&t=1535144874000',
      asset_make: 'Palmer Johnson',
      asset_model: 'Tri-Masted Staysail',
      asset_monthly_maintance: 0,
      asset_name: '1983 Palmer Johnson',
      asset_type: 'sail',
      asset_year: 1983,
    };
    this.firestore.collection('asset').add(asset);
  }
}
