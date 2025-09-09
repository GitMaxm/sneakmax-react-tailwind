// stores/CartStore.ts
import { makeAutoObservable } from "mobx";
import type { IProductItem, ICartItem } from "../types/products.d";

class CartStore {
    items: ICartItem[] = [];

    // Добавить товар в корзину с размером
    addToCart = (product: IProductItem, size: number, quantity: number = 1) => {
        const existingItem = this.items.find(item =>
            item.product.id === product.id && item.selectedSize === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                product,
                quantity,
                selectedSize: size
            });
        }
    }

    // Увеличить количество товара
    increaseQuantity = (productId: string, size: number) => {
        const item = this.items.find(item =>
            item.product.id === productId && item.selectedSize === size
        );
        if (item) {
            item.quantity += 1;
        }
    }

    // Уменьшить количество товара
    decreaseQuantity = (productId: string, size: number) => {
        const item = this.items.find(item =>
            item.product.id === productId && item.selectedSize === size
        );
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.removeFromCart(productId, size);
            }
        }
    }

    // Удалить товар из корзины
    removeFromCart = (productId: string, size: number) => {
        this.items = this.items.filter(item =>
            !(item.product.id === productId && item.selectedSize === size)
        );
    }

    // Очистить корзину
    clearCart = () => {
        this.items = [];
    }

    // Получить общее количество товаров
    get totalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Получить общую стоимость
    get totalPrice() {
        return this.items.reduce((total, item) =>
            total + (item.product.priceMain * item.quantity), 0);
    }

    // Получить все items
    get cartItems() {
        return this.items;
    }

    // Проверить, есть ли товар с размером в корзине
    hasItem = (productId: string, size: number): boolean => {
        return this.items.some(item =>
            item.product.id === productId && item.selectedSize === size
        );
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default new CartStore();