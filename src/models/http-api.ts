import { IProduct, IShopProduct } from './products';
import { IOptimizationGeneral } from './optimization';

export interface IOptimizationResult {
  bucketID?: number;
  name?: string;
  optimization: {
    product_bucket: IShopProduct[];
    general: IOptimizationGeneral;
  }
  products: IProduct;
}

export interface IProductBasketResponse {
  id: number;
  name: string;
  creation_date: string;
  period: number;
  max_sum: number;
  products: string;
}

export interface IProductBasket {
  id: number;
  name: string;
  creationDate: string;
  period: number;
  maxSum: number;
  products: {
    product_bucket: IShopProduct[];
    general: IOptimizationGeneral;
  };
}

// user = models.ForeignKey(User, on_delete=models.CASCADE)
// name = models.CharField(max_length=250)
// creation_date = models.DateTimeField(auto_now_add=True)
// period = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(366)])
// max_sum = models.FloatField()
// products = models.JSONField()
