export interface IProductItem {
  id: string;
  title: string;
  description: string;
  priceMain: number;
  article: number;
  quantity: number;
  imgMain: string;
  imgCatalog: string;
  size: number[];
  characteristics: {
    gender: string;
    color: string;
    composition: string;
    country: string;
  };
  priceOld?: number;
}

export interface ICartItem {
  quantity: number;
  selectedSize: number;
  product: IProductItem;
}

export type TProductList = IProductItem[];
