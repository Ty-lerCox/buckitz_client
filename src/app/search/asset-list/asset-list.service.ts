// Core
import { Injectable, EventEmitter, Output } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Services
import { SessionService } from 'src/app/session/session.service';
import { SearchService } from '../search.service';

// Interfaces & Settings
import { Asset, SessionAsset } from './asset/settings';

@Injectable({
  providedIn: 'root',
})
export class AssetListService {
  private sessionAssets: SessionAsset[] = [];
  private assets: Asset[] = [];
  private categoryValue = '';

  @Output() sessionAssetsChanged: EventEmitter<
    SessionAsset[]
  > = new EventEmitter();
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
      this.categoryValue = category;
      this.getAssetsByCategory(category);
    });
    // this.addAssetBoat();
    // this.addImage();
    // this.addAssetHouse();
    // this.addAssetChildren();
  }

  getAssetsByCategory(category: string) {
    this.firestore
      .collection('asset', (ref) =>
        ref.where('asset_category', '==', category).limit(10)
      )
      .snapshotChanges()
      .subscribe((data: any) => {
        this.assets = data.map((e: any) => {
          return {
            asset_id: e.payload.doc.id,
            ...(e.payload.doc.data() as Asset),
          } as Asset;
        });
        this.assetsChanged.emit(this.assets);
        this.getSessionAssets();
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
      session_asset_category: this.categoryValue,
      session_asset_monthly_cost: asset.asset_monthly_maintance,
    };
    this.firestore.collection('sessionAsset').add(sessionAsset);
  }

  addAssetCar() {
    const asset: Asset = {
      asset_category: 'car',
      asset_cmb_1_title: 'Make',
      asset_cmb_1_value: 'Tesla',
      asset_cmb_2_title: 'Model',
      asset_cmb_2_value: 'Model 3',
      asset_cmb_3_title: 'Body Type',
      asset_cmb_3_value: 'Sedan',
      asset_cost: 45000,
      asset_monthly_maintance: 800,
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

  addAssetChildren() {
    let asset: Asset = {
      asset_category: 'children',
      asset_cmb_1_title: 'Gender',
      asset_cmb_1_value: 'Male',
      asset_cmb_2_title: 'Education',
      asset_cmb_2_value: 'High School',
      asset_cost: 5000,
      asset_monthly_maintance: 1050,
    };
    this.firestore.collection('asset').add(asset);
    asset = {
      asset_category: 'children',
      asset_cmb_1_title: 'Gender',
      asset_cmb_1_value: 'Female',
      asset_cmb_2_title: 'Education',
      asset_cmb_2_value: 'High School',
      asset_cost: 5000,
      asset_monthly_maintance: 1050,
    };
    this.firestore.collection('asset').add(asset);
    asset = {
      asset_category: 'children',
      asset_cmb_1_title: 'Gender',
      asset_cmb_1_value: 'Male',
      asset_cmb_2_title: 'Education',
      asset_cmb_2_value: 'Bachelors Degree',
      asset_cost: 5000,
      asset_monthly_maintance: 1700,
    };
    this.firestore.collection('asset').add(asset);
    asset = {
      asset_category: 'children',
      asset_cmb_1_title: 'Gender',
      asset_cmb_1_value: 'Female',
      asset_cmb_2_title: 'Education',
      asset_cmb_2_value: 'Bachelors Degree',
      asset_cost: 5000,
      asset_monthly_maintance: 1700,
    };
    this.firestore.collection('asset').add(asset);
    asset = {
      asset_category: 'children',
      asset_cmb_1_title: 'Gender',
      asset_cmb_1_value: 'Male',
      asset_cmb_2_title: 'Education',
      asset_cmb_2_value: 'Masters Degree',
      asset_cost: 5000,
      asset_monthly_maintance: 2000,
    };
    this.firestore.collection('asset').add(asset);
    asset = {
      asset_category: 'children',
      asset_cmb_1_title: 'Gender',
      asset_cmb_1_value: 'Female',
      asset_cmb_2_title: 'Education',
      asset_cmb_2_value: 'Masters Degree',
      asset_cost: 5000,
      asset_monthly_maintance: 2000,
    };
    this.firestore.collection('asset').add(asset);
  }

  addAssetHouse() {
    const asset: Asset = {
      asset_category: 'house',
      asset_cmb_1_title: 'Location',
      asset_cmb_1_value: 'Charleston, SC',
      asset_cost: 12500000,
      asset_monthly_maintance: 75000,
      asset_radio_1_title: 'Type',
      asset_radio_1_value: 'for sale',
      asset_radio_1_valueList: 'all,rent,for sale',
      asset_slider_1_title: 'Beds',
      asset_slider_1_value: 5,
      asset_slider_2_title: 'Baths',
      asset_slider_2_value: 6,
      asset_slider_3_title: 'sqft',
      asset_slider_3_value: 7800,
      asset_slider_4_title: 'Year',
      asset_slider_4_value: 1835,
      asset_slider_5_title: 'Lot Size',
      asset_slider_5_value: 0.6,
      asset_source:
        'https://www.zillow.com/homedetails/1130-Holloway-Ct-Johns-Island-SC-29455/80214695_zpid/',
    };
    this.firestore.collection('asset').add(asset);
  }

  addAssetBoat() {
    const asset: Asset = {
      asset_category: 'boat',
      asset_cmb_1_title: 'location',
      asset_cmb_1_value: 'Onalaska, TX',
      asset_cmb_2_title: 'Make',
      asset_cmb_2_value: 'Tracker',
      asset_cmb_3_title: 'Model',
      asset_cmb_3_value: 'Pro Team 195 TXW',
      asset_cost: 30000,
      asset_monthly_maintance: 400,
      asset_radio_1_title: 'condition',
      asset_radio_1_value: 'new',
      asset_radio_1_valueList: 'all,new,used',
      asset_radio_2_title: 'type',
      asset_radio_2_value: 'power',
      asset_radio_2_valueList: 'all,sail,power',
      asset_slider_1_title: 'length',
      asset_slider_1_value: 19,
      asset_slider_2_title: 'year',
      asset_slider_2_value: 2020,
      asset_source:
        'https://www.boats.com/power-boats/2020-tracker-pro-team-195-txw-tournament-edition-7375068/',
    };
    this.firestore.collection('asset').add(asset);
  }
}
