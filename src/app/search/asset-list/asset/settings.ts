export interface Asset {
  asset_id?: string;
  asset_category: string;
  asset_cost: number;
  asset_current_img?: number;
  asset_cmb_1_title?: string;
  asset_cmb_1_value?: string;
  asset_cmb_2_title?: string;
  asset_cmb_2_value?: string;
  asset_cmb_3_title?: string;
  asset_cmb_3_value?: string;
  asset_cmb_4_title?: string;
  asset_cmb_4_value?: string;
  asset_cmb_5_title?: string;
  asset_cmb_5_value?: string;
  asset_cmb_6_title?: string;
  asset_cmb_6_value?: string;
  asset_monthly_maintance: number;
  asset_name: string;
  asset_radio_1_title?: string;
  asset_radio_1_value?: string;
  asset_radio_1_valueList?: string;
  asset_radio_2_title?: string;
  asset_radio_2_value?: string;
  asset_radio_2_valueList?: string;
  asset_radio_3_title?: string;
  asset_radio_3_value?: string;
  asset_radio_3_valueList?: string;
  asset_radio_4_title?: string;
  asset_radio_4_value?: string;
  asset_radio_4_valueList?: string;
  asset_radio_5_title?: string;
  asset_radio_5_value?: string;
  asset_radio_5_valueList?: string;
  asset_radio_6_title?: string;
  asset_radio_6_value?: string;
  asset_radio_6_valueList?: string;
  asset_slider_1_title?: string;
  asset_slider_1_value?: number;
  asset_slider_2_title?: string;
  asset_slider_2_value?: number;
  asset_slider_3_title?: string;
  asset_slider_3_value?: number;
  asset_slider_4_title?: string;
  asset_slider_4_value?: number;
  asset_slider_5_title?: string;
  asset_slider_5_value?: number;
  asset_slider_6_title?: string;
  asset_slider_6_value?: number;
}

export interface Image {
  image_id?: string;
  image_asset_id: string;
  image_asset_src: string;
}

export interface SessionAsset {
  session_asset_id?: string;
  session_asset_session_id: string;
  session_asset_asset_id: string;
}
