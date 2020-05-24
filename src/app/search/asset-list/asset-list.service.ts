// Core
import { Injectable, EventEmitter, Output } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Services
import { SessionService } from 'src/app/session/session.service';
import { SearchService } from '../search.service';

// Interfaces & Settings
import { Asset, SessionAsset, Image } from './asset/settings';

@Injectable({
  providedIn: 'root',
})
export class AssetListService {
  private sessionAssets: SessionAsset[] = [];
  private assets: Asset[] = [];
  private assetImages: Image[] = [];

  @Output() sessionAssetsChanged: EventEmitter<
    SessionAsset[]
  > = new EventEmitter();
  @Output() assetImagesChanged: EventEmitter<Image[]> = new EventEmitter();
  @Output() assetsChanged: EventEmitter<Asset[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private sessionService: SessionService,
    private searchService: SearchService
  ) {
    this.sessionService.sessionChanged.subscribe((isSession: boolean) => {
      if (isSession) {
        this.sessionAssets = [];
      }
    });
    this.searchService.categoryValueChanged.subscribe((category: string) => {
      this.assets = [];
      this.getAssets(category);
    });
    //this.addAsset();
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
        const assetIds = this.assets.map((asset: Asset) => asset.asset_id);
        this.firestore
          .collection('image', (ref) =>
            ref.where('image_asset_id', 'in', assetIds)
          )
          .snapshotChanges()
          .subscribe((imageData: any) => {
            this.assetImages = imageData.map((e: any) => {
              return {
                image_asset_id: e.payload.doc.id,
                ...(e.payload.doc.data() as Image),
              } as Image;
            });
            this.assetsChanged.emit(this.assets);
            this.assetImagesChanged.emit(this.assetImages);
            this.getSessionAssets();
          });
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
    //this.sessionAssetsChanged.emit(this.sessionAssets);
    this.firestore.collection('sessionAsset').add(sessionAsset);
  }

  addAsset() {
    const asset: Asset = {
      asset_category: 'car',
      asset_cmb_1_title: 'Make',
      asset_cmb_1_value: 'Ford',
      asset_cmb_2_title: 'Model',
      asset_cmb_2_value: 'F-150',
      asset_cmb_3_title: 'Body Type',
      asset_cmb_3_value: 'Truck',
      asset_cost: 40000,
      asset_monthly_maintance: 1500,
      asset_name: 'Ford F-150',
      asset_radio_1_title: '',
      asset_radio_1_value: '',
      asset_radio_1_valueList: '',
      asset_radio_2_title: '',
      asset_radio_2_value: '',
      asset_radio_2_valueList: '',
      asset_slider_1_title: '',
      asset_slider_1_value: 0,
      asset_slider_2_title: '',
      asset_slider_2_value: 0,
    };
    this.firestore.collection('asset').add(asset);
  }
}
