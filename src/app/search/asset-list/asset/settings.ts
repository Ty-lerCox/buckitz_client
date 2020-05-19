export interface Asset {
  asset_id?: string;
  asset_category: string;
  asset_cost: number;
  asset_desc_1: string;
  asset_desc_2: string;
  asset_desc_3: string;
  asset_desc_4: string;
  asset_desc_5: string;
  asset_imgs: string;
  asset_make: string;
  asset_model: string;
  asset_monthly_maintance: number;
  asset_name: string;
  asset_type: string;
  asset_year: number;
  asset_current_img?: number;
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
