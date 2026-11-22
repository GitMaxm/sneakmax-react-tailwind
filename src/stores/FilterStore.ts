import { makeAutoObservable } from 'mobx';
import filterPrice from '../helper/filterPrice';
import type { IFilterState } from '../types/filters.d';

class FilterStore {
  filters: IFilterState = {
    priceMin: filterPrice.MIN,
    priceMax: filterPrice.MAX,
    gender: undefined,
    sizes: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  tempPriceMin: number = filterPrice.MIN;
  tempPriceMax: number = filterPrice.MAX;
  tempGender: string = '';
  tempSizes: number[] = [];

  setTempPriceMin = (value: number) => {
    this.tempPriceMin = value;
  };

  setTempPriceMax = (value: number) => {
    this.tempPriceMax = value;
  };

  setTempGender = (value: string) => {
    this.tempGender = value;
  };

  setTempSizes = (sizes: number[]) => {
    this.tempSizes = sizes;
  };

  applyFilters = () => {
    this.filters = {
      priceMin: this.tempPriceMin,
      priceMax: this.tempPriceMax,
      gender: this.tempGender || undefined,
      sizes: this.tempSizes,
    };
  };

  resetFilters = () => {
    this.tempPriceMin = filterPrice.MIN;
    this.tempPriceMax = filterPrice.MAX;
    this.tempGender = '';
    this.tempSizes = [];

    this.filters = {
      priceMin: filterPrice.MIN,
      priceMax: filterPrice.MAX,
      gender: undefined,
      sizes: [],
    };
  };

  get hasActiveFilters(): boolean {
    return (
      this.filters.priceMin !== filterPrice.MIN ||
      this.filters.priceMax !== filterPrice.MAX ||
      this.filters.gender !== undefined ||
      this.filters.sizes.length > 0
    );
  }
}

export default new FilterStore();
