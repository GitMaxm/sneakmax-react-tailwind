import { makeAutoObservable } from 'mobx';
import type { IProductItem, ICartItem } from '../types/products.d';

class CartStore {
  items: ICartItem[] = [];

  addToCart = (
    product: IProductItem,
    size: number,
    quantity: number = 1,
  ) => {
    const existingItem = this.items.find(
      (item) =>
        item.product.id === product.id && item.selectedSize === size,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        product,
        quantity,
        selectedSize: size,
      });
    }
  };

  increaseQuantity = (productId: string, size: number) => {
    const item = this.items.find(
      (item) =>
        item.product.id === productId && item.selectedSize === size,
    );
    if (item) {
      item.quantity += 1;
    }
  };

  decreaseQuantity = (productId: string, size: number) => {
    const item = this.items.find(
      (item) =>
        item.product.id === productId && item.selectedSize === size,
    );
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(productId, size);
      }
    }
  };

  removeFromCart = (productId: string, size: number) => {
    this.items = this.items.filter(
      (item) =>
        !(
          item.product.id === productId && item.selectedSize === size
        ),
    );
  };

  clearCart = () => {
    this.items = [];
  };

  get totalOriginalPrice() {
    return this.items.reduce((total, item) => {
      const originalPrice =
        item.product.priceOld || item.product.priceMain;
      return total + originalPrice * item.quantity;
    }, 0);
  }

  get totalDiscount() {
    return this.items.reduce((total, item) => {
      if (item.product.priceOld) {
        const discountPerItem =
          item.product.priceOld - item.product.priceMain;
        return total + discountPerItem * item.quantity;
      }
      return total;
    }, 0);
  }

  get hasDiscountItems() {
    return this.items.some((item) => item.product.priceOld);
  }

  get totalItems() {
    return this.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }

  get totalPrice() {
    return this.items.reduce(
      (total, item) => total + item.product.priceMain * item.quantity,
      0,
    );
  }

  get cartItems() {
    return this.items;
  }

  hasItem = (productId: string, size: number): boolean => {
    return this.items.some(
      (item) =>
        item.product.id === productId && item.selectedSize === size,
    );
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default new CartStore();
