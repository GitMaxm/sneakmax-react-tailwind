// types/products.d.ts
export interface IProductItem {
    id: string;
    title: string;
    description: string;
    priceMain: number;
    priceOld?: number;
    article: number;
    quantity: number;
    imgMain: string;
    imgCatalog: string;
    size: number[];
    characteristics: {
        gender: string;
        // gender: 'Male' | 'Female' | 'Unisex';
        color: string;
        composition: string;
        country: string;
    };
}

export interface ICartItem {
    product: IProductItem;
    quantity: number;
    selectedSize: number; // Добавляем выбранный размер
}

export type IProductList = IProductItem[];