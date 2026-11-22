import { makeAutoObservable } from 'mobx';
import products from '../data/products.json';
import type { IProductItem } from '../types/products';
import type { IFilterState } from '../types/filters.d';

class ProductsStore {
  products: IProductItem[] = products;

  constructor() {
    makeAutoObservable(this);
  }

  getProductById = (id: string): IProductItem | undefined => {
    return this.products.find((product) => product.id === id);
  };

  getFilteredProducts = (filters: IFilterState): IProductItem[] => {
    const { priceMin, priceMax, gender, sizes } = filters;

    return this.products.filter((product) => {
      const priceInRange =
        product.priceMain >= priceMin &&
        product.priceMain <= priceMax;

      const genderMatch =
        !gender || product.characteristics.gender === gender;

      const sizeMatch =
        sizes.length === 0 ||
        (product.size &&
          product.size.some((size) => sizes.includes(size)));

      return priceInRange && genderMatch && sizeMatch;
    });
  };
}

export default new ProductsStore();
