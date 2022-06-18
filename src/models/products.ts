export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
}

export interface IShopProduct {
  id: number;
  product: IProduct;
  name: string;
  price: number;
  amount: number;
  unit: string;
  states?: IAdditionalState[];
}

export interface IAdditionalState {
  state: string;
  energy: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export class ShopProduct implements IShopProduct {
  id: number;
  product: IProduct;
  name: string;
  price: number;
  amount: number;
  unit: string;
  states?: IAdditionalState[] | undefined;

  constructor(product: IShopProduct) {
    this.id = product.id
    this.name = product.name;
    this.product = product.product;
    this.unit = product.unit;
    this.price = product.price;
    this.amount = product.amount;
    this.states = product.states || [];
  }
}

export interface ICategoryProducts extends ICategory {
  products: ShopProduct;
}

export enum Comparators {
  'EQ' = 'EQ',
  'GT' = 'GT',
  'LT' = 'LT',
}

export interface IRestriction {
  id: number;
  product: IProduct;
  amount: number;
  comparator: Comparators
  unit: string;
}
