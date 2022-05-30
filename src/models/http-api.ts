import { IProduct, IShopProduct } from './products';
import { IOptimizationGeneral } from './optimization';

export interface IOptimizationResponse {
  bucketID?: number;
  optimization: {
    product_bucket: IShopProduct[];
    general: IOptimizationGeneral;
  }
  products: IProduct;
}
