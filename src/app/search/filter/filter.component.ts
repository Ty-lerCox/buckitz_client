// Core
import { Component, OnInit } from '@angular/core';

// Interfaces & Settings
import { Asset } from '../asset-list/asset/settings';

// Services
import { AssetListService } from '../asset-list/asset-list.service';
import { Utility } from 'src/app/utility';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  Utility = Utility;
  public allAssets: Asset[] = [];
  public cmb1Title: any;
  public cmb1Value: any;
  public cmb1ValueList: string[] = [];
  public cmb2Title: any;
  public cmb2Value: any;
  public cmb2ValueList: string[] = [];
  public cmb3Title: any;
  public cmb3Value: any;
  public cmb3ValueList: string[] = [];
  public cmb4Title: any;
  public cmb4Value: any;
  public cmb4ValueList: string[] = [];
  public cmb5Title: any;
  public cmb5Value: any;
  public cmb5ValueList: string[] = [];
  public cmb6Title: any;
  public cmb6Value: any;
  public cmb6ValueList: string[] = [];
  public radio1Title: any;
  public radio1Value: any;
  public radio1ValueList: any;
  public radio2Title: any;
  public radio2Value: any;
  public radio2ValueList: any;
  public radio3Title: any;
  public radio3Value: any;
  public radio3ValueList: any;
  public radio4Title: any;
  public radio4Value: any;
  public radio4ValueList: any;
  public radio5Title: any;
  public radio5Value: any;
  public radio5ValueList: any;
  public radio6Title: any;
  public radio6Value: any;
  public radio6ValueList: any;
  public slider1Title: any;
  public slider1Value: any;
  public slider2Title: any;
  public slider2Value: any;
  public slider3Title: any;
  public slider3Value: any;
  public slider4Title: any;
  public slider4Value: any;
  public slider5Title: any;
  public slider5Value: any;
  public slider6Title: any;
  public slider6Value: any;

  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {
    this.assetListService.assetsChanged.subscribe((assets: Asset[]) => {
      const asset: Asset = assets[0];
      if (Utility.isDefined(asset.asset_cmb_1_title)) {
        this.cmb1Title = asset.asset_cmb_1_title;
        this.cmb1Value = asset.asset_cmb_1_value;
      }
      if (Utility.isDefined(asset.asset_cmb_2_title)) {
        this.cmb2Title = asset.asset_cmb_2_title;
        this.cmb2Value = asset.asset_cmb_2_value;
      }
      if (Utility.isDefined(asset.asset_cmb_3_title)) {
        this.cmb3Title = asset.asset_cmb_3_title;
        this.cmb3Value = asset.asset_cmb_3_value;
      }
      if (Utility.isDefined(asset.asset_cmb_4_title)) {
        this.cmb4Title = asset.asset_cmb_4_title;
        this.cmb4Value = asset.asset_cmb_4_value;
      }
      if (Utility.isDefined(asset.asset_cmb_5_title)) {
        this.cmb5Title = asset.asset_cmb_5_title;
        this.cmb5Value = asset.asset_cmb_5_value;
      }
      if (Utility.isDefined(asset.asset_cmb_6_title)) {
        this.cmb6Title = asset.asset_cmb_6_title;
        this.cmb6Value = asset.asset_cmb_6_value;
      }

      if (Utility.isDefined(asset.asset_radio_1_title)) {
        this.radio1Title = asset.asset_radio_1_title;
        this.radio1Value = asset.asset_radio_1_value;
        this.radio1ValueList = this.getOptions(asset.asset_radio_1_valueList);
      }
      if (Utility.isDefined(asset.asset_radio_2_title)) {
        this.radio2Title = asset.asset_radio_2_title;
        this.radio2Value = asset.asset_radio_2_value;
        this.radio2ValueList = this.getOptions(asset.asset_radio_2_valueList);
      }
      if (Utility.isDefined(asset.asset_radio_3_title)) {
        this.radio3Title = asset.asset_radio_3_title;
        this.radio3Value = asset.asset_radio_3_value;
        this.radio3ValueList = this.getOptions(asset.asset_radio_3_valueList);
      }
      if (Utility.isDefined(asset.asset_radio_4_title)) {
        this.radio4Title = asset.asset_radio_4_title;
        this.radio4Value = asset.asset_radio_4_value;
        this.radio4ValueList = this.getOptions(asset.asset_radio_4_valueList);
      }
      if (Utility.isDefined(asset.asset_radio_5_title)) {
        this.radio5Title = asset.asset_radio_5_title;
        this.radio5Value = asset.asset_radio_5_value;
        this.radio5ValueList = this.getOptions(asset.asset_radio_5_valueList);
      }
      if (Utility.isDefined(asset.asset_radio_6_title)) {
        this.radio6Title = asset.asset_radio_6_title;
        this.radio6Value = asset.asset_radio_6_value;
        this.radio6ValueList = this.getOptions(asset.asset_radio_6_valueList);
      }
      if (Utility.isDefined(asset.asset_radio_6_title)) {
        this.radio6Title = asset.asset_radio_6_title;
        this.radio6Value = asset.asset_radio_6_value;
        this.radio6ValueList = this.getOptions(asset.asset_radio_6_valueList);
      }

      if (Utility.isDefined(asset.asset_slider_1_title)) {
        this.slider1Title = asset.asset_slider_1_title;
        this.slider1Value = asset.asset_slider_1_value;
      }
      if (Utility.isDefined(asset.asset_slider_2_title)) {
        this.slider2Title = asset.asset_slider_2_title;
        this.slider2Value = asset.asset_slider_2_value;
      }
      if (Utility.isDefined(asset.asset_slider_3_title)) {
        this.slider3Title = asset.asset_slider_3_title;
        this.slider3Value = asset.asset_slider_3_value;
      }
      if (Utility.isDefined(asset.asset_slider_4_title)) {
        this.slider4Title = asset.asset_slider_4_title;
        this.slider4Value = asset.asset_slider_4_value;
      }
      if (Utility.isDefined(asset.asset_slider_5_title)) {
        this.slider5Title = asset.asset_slider_5_title;
        this.slider5Value = asset.asset_slider_5_value;
      }
      if (Utility.isDefined(asset.asset_slider_6_title)) {
        this.slider6Title = asset.asset_slider_6_title;
        this.slider6Value = asset.asset_slider_6_value;
      }

      this.cmb1ValueList = [];
      this.cmb2ValueList = [];
      this.cmb3ValueList = [];
      this.cmb4ValueList = [];
      this.cmb5ValueList = [];
      this.cmb6ValueList = [];

      assets.forEach((a: Asset) => {
        if (this.cmb1ValueList.indexOf(a.asset_cmb_1_value) === -1) {
          this.cmb1ValueList.push(a.asset_cmb_1_value);
        }
        if (this.cmb2ValueList.indexOf(a.asset_cmb_2_value) === -1) {
          this.cmb2ValueList.push(a.asset_cmb_2_value);
        }
        if (this.cmb3ValueList.indexOf(a.asset_cmb_3_value) === -1) {
          this.cmb3ValueList.push(a.asset_cmb_3_value);
        }
        if (this.cmb4ValueList.indexOf(a.asset_cmb_4_value) === -1) {
          this.cmb4ValueList.push(a.asset_cmb_4_value);
        }
        if (this.cmb5ValueList.indexOf(a.asset_cmb_5_value) === -1) {
          this.cmb5ValueList.push(a.asset_cmb_5_value);
        }
        if (this.cmb6ValueList.indexOf(a.asset_cmb_6_value) === -1) {
          this.cmb6ValueList.push(a.asset_cmb_6_value);
        }
      });
    });
  }

  getOptions(concatValue: string): string[] {
    return concatValue.split(',');
  }
}
