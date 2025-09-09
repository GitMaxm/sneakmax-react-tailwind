// stores/ModalStore.ts
import { makeAutoObservable } from "mobx";
import type { IProductItem } from "../types/products.d";

class ModalStore {
    productModal: IProductItem | null = null;
    isProductModalOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    openProductModal = (product: IProductItem) => {
        this.productModal = product;
        this.isProductModalOpen = true;
    }

    closeProductModal = () => {
        this.productModal = null;
        this.isProductModalOpen = false;
    }
}

export default new ModalStore();