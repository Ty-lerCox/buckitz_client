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
  private categoryValue = '';

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
          .collection('image', (ref) => ref.where('image_index', '==', 0))
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

  addImage() {
    const image: Image = {
      image_asset_id: 'VAO2AUsip86b0DPOBPvT',
      image_index: 0,
      image_asset_src:
        'data:image/png;base64,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IE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAOAEIAAAAIE4AAgAAAIgTgAAAAADiBCAAAACAuG30AwAAc9r3fR/9DDxu2zbzHQDwFxtAAAAAAHECEAAAAECcFWEA4CbXwNbi+hcAcIsNIAAAAIA4b4kAgG/ZAlqD7R8A4Ds2gAAAAADivCkCAH5kC2hutn8AgJ8YFgCAu4hAcxJ/AIB7GBgAgLuJQHMRfwCAexkaAICHiEBzEH8AgEcYHACAh4lAY4k/AMCjDA8AwFNEoDHEHwDgGQYIAOBpItBniT8AwLMMEQDAy4SgYwk/AMCrDBMAwNsIQe8l/AAA72KoAAAOIQY9R/QBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgI/5B7siI4Emy+S5AAAAAElFTkSuQmCC',
    };
    this.firestore.collection('image').add(image);
  }
}
