// Core
import { Injectable, EventEmitter, Output } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// External Components
import { StorageMap } from '@ngx-pwa/local-storage';

// Services
import { SessionService } from 'src/app/session/session.service';

// Interfaces & Settings
import { Asset, SessionAsset } from './asset/settings';

@Injectable({
  providedIn: 'root',
})
export class AssetListService {
  private sessionAssets: SessionAsset[] = [];
  private assets: Asset[] = [];
  private category = 'boat';

  @Output() sessionAssetsChanged: EventEmitter<
    SessionAsset[]
  > = new EventEmitter();
  @Output() assetsChanged: EventEmitter<Asset[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private storage: StorageMap,
    private sessionService: SessionService
  ) {
    this.getAssets(this.category);
    this.sessionService.sessionChanged.subscribe((isSession: boolean) => {
      if (isSession) {
        this.getSessionAssets();
      }
    });
  }

  getAssets(category: string) {
    this.firestore
      .collection('asset', (ref) => ref.where('asset_category', '==', category))
      .snapshotChanges()
      .subscribe((data: any) => {
        this.assets = data.map((e: any) => {
          return {
            asset_id: e.payload.doc.id,
            ...(e.payload.doc.data() as Asset),
          } as Asset;
        });
        this.assetsChanged.emit(this.assets);
      });
  }

  getSessionAssets() {
    this.firestore
      .collection('sessionAsset', (ref) =>
        ref.where(
          'session_asset_session_id',
          '==',
          this.sessionService.getSessionId()
        )
      )
      .snapshotChanges()
      .subscribe((data: any) => {
        this.sessionAssets = data.map((e: any) => {
          return {
            session_asset_id: e.payload.doc.id,
            ...(e.payload.doc.data() as SessionAsset),
          } as SessionAsset;
        });
        this.sessionAssetsChanged.emit(this.sessionAssets);
      });
  }

  deleteAsset(sessionAsset: SessionAsset) {
    this.firestore
      .doc('sessionAsset/' + sessionAsset.session_asset_id)
      .delete();
  }

  addAssetToSession(asset: Asset) {
    const sessionAsset: SessionAsset = {
      session_asset_session_id: this.sessionService.getSessionId(),
      session_asset_asset_id: asset.asset_id,
    };
    this.firestore.collection('sessionAsset').add(sessionAsset);
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
