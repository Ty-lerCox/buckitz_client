import { Category, Categories } from './home/category-list/settings';
import { Asset } from './search/asset-list/asset/settings';

export class Utility {
  static isDefined<T>(value: T | undefined | null): value is T {
    return (value as any) !== undefined && (value as any) !== null;
  }
  static scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  static getRecommendedYearlyIncome(
    category: Categories,
    asset: Asset
  ): number {
    let result = 0;
    switch (category) {
      case Categories.House:
        result = result + asset.asset_monthly_maintance;
        result = (result / 0.3) * 12;
        break;
      case Categories.Cars:
        result = result + asset.asset_monthly_maintance;
        result = (result / 0.1) * 12;
        break;
      default:
        result = result + asset.asset_monthly_maintance;
        result = (result / 0.1) * 12;
        break;
    }
    return result;
  }

  static getRecommendedYearlyIncomeByAssets(
    category: Categories,
    assets: Asset[]
  ): number {
    let result = 0;
    switch (category) {
      case Categories.House:
        assets.forEach((asset: Asset) => {
          result = result + asset.asset_monthly_maintance;
        });
        result = (result / 0.3) * 12;
        break;
      case Categories.Cars:
        assets.forEach((asset: Asset) => {
          result = result + asset.asset_monthly_maintance;
        });
        result = (result / 0.1) * 12;
        break;
      default:
        assets.forEach((asset: Asset) => {
          result = result + asset.asset_monthly_maintance;
        });
        result = (result / 0.1) * 12;
        break;
    }
    return result;
  }
}
