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
  allAssets: Asset[] = [];
  cmb1Title: any;
  cmb1Value: any;
  cmb1ValueList: string[] = [];
  cmb2Title: any;
  cmb2Value: any;
  cmb2ValueList: string[] = [];
  cmb3Title: any;
  cmb3Value: any;
  cmb3ValueList: string[] = [];
  cmb4Title: any;
  cmb4Value: any;
  cmb4ValueList: string[] = [];
  cmb5Title: any;
  cmb5Value: any;
  cmb5ValueList: string[] = [];
  cmb6Title: any;
  cmb6Value: any;
  cmb6ValueList: string[] = [];
  radio1Title: any;
  radio1Value: any;
  radio1ValueList: any;
  radio2Title: any;
  radio2Value: any;
  radio2ValueList: any;
  radio3Title: any;
  radio3Value: any;
  radio3ValueList: any;
  radio4Title: any;
  radio4Value: any;
  radio4ValueList: any;
  radio5Title: any;
  radio5Value: any;
  radio5ValueList: any;
  radio6Title: any;
  radio6Value: any;
  radio6ValueList: any;
  slider1Title: any;
  slider1Value: any;
  slider2Title: any;
  slider2Value: any;
  slider3Title: any;
  slider3Value: any;
  slider4Title: any;
  slider4Value: any;
  slider5Title: any;
  slider5Value: any;
  slider6Title: any;
  slider6Value: any;

  constructor(private assetListService: AssetListService) {}

  ngOnInit(): void {
    this.assetListService.assetsChanged.subscribe((assets: Asset[]) => {
      this.clearFilters();
      this.getFilters(assets);
    });
  }

  getOptions(concatValue: string): string[] {
    return concatValue.split(',');
  }

  clearFilters() {
    this.cmb1Title = null;
    this.cmb1Value = null;
    this.cmb1ValueList = [];
    this.cmb2Title = null;
    this.cmb2Value = null;
    this.cmb2ValueList = [];
    this.cmb3Title = null;
    this.cmb3Value = null;
    this.cmb3ValueList = [];
    this.cmb4Title = null;
    this.cmb4Value = null;
    this.cmb4ValueList = [];
    this.cmb5Title = null;
    this.cmb5Value = null;
    this.cmb5ValueList = [];
    this.cmb6Title = null;
    this.cmb6Value = null;
    this.cmb6ValueList = [];
    this.radio1Title = null;
    this.radio1Value = null;
    this.radio1ValueList = null;
    this.radio2Title = null;
    this.radio2Value = null;
    this.radio2ValueList = null;
    this.radio3Title = null;
    this.radio3Value = null;
    this.radio3ValueList = null;
    this.radio4Title = null;
    this.radio4Value = null;
    this.radio4ValueList = null;
    this.radio5Title = null;
    this.radio5Value = null;
    this.radio5ValueList = null;
    this.radio6Title = null;
    this.radio6Value = null;
    this.radio6ValueList = null;
    this.slider1Title = null;
    this.slider1Value = null;
    this.slider2Title = null;
    this.slider2Value = null;
    this.slider3Title = null;
    this.slider3Value = null;
    this.slider4Title = null;
    this.slider4Value = null;
    this.slider5Title = null;
    this.slider5Value = null;
    this.slider6Title = null;
    this.slider6Value = null;
  }

  getFilters(assets: Asset[]) {
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
  }
}
