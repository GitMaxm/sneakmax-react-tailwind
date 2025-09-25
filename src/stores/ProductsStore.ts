import { makeAutoObservable } from 'mobx';
// import products from '../data/products.json';
import type { IProductItem } from "../types/products";
import type { FilterState } from "../types/filters.d";
import { URL_DATA } from '@/helper/urlData';

class ProductsStore {
    products: IProductItem[] = [];
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.fetchProducts(); // Автоматически загружаем товары при создании
    }

    // Загрузка товаров с сервера
    fetchProducts = async (): Promise<void> => {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await fetch(`${URL_DATA}/products`);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            const data = await response.json();
            //тест
            setTimeout(() => {
                this.products = data;
            }, 1000);
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
            console.error('Ошибка загрузки товаров:', error);
        } finally {
            this.isLoading = false;
        }
    };

    retryFetch = async (): Promise<void> => {
        await this.fetchProducts();
    };

    getProductById = (id: string): IProductItem | undefined => {
        return this.products.find(product => product.id === id);
    };

    // Метод для фильтрации товаров (принимает фильтры как параметр)
    getFilteredProducts = (filters: FilterState): IProductItem[] => {
        const { priceMin, priceMax, gender, sizes } = filters;

        return this.products.filter(product => {
            // Фильтр по цене
            const priceInRange = product.priceMain >= priceMin && product.priceMain <= priceMax;

            // Фильтр по полу (если указан)
            const genderMatch = !gender || product.characteristics.gender === gender;

            // Фильтр по размерам (если указаны)
            const sizeMatch = sizes.length === 0 ||
                (product.size && product.size.some(size => sizes.includes(size)));

            return priceInRange && genderMatch && sizeMatch;
        });
    };
}

export default new ProductsStore();