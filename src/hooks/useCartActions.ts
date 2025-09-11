// hooks/useCartActions.ts
import { useStores } from "@/Context/rootStoreContext";
import { useCartToast } from "@/helper/toastHelpers";

import type { IProductItem } from "@/types/products";

export const useCartActions = () => {
    const { cartStore, modalStore } = useStores();
    const { removedFromCart } = useCartToast();

    const handleIncreaseQuantity = (productId: string, size: number) => {
        cartStore.increaseQuantity(productId, size);
    };

    const handleDecreaseQuantity = (productId: string, size: number) => {
        cartStore.decreaseQuantity(productId, size);
    };

    const handleRemoveFromCart = (productId: string, size: number, productTitle: string) => {
        cartStore.removeFromCart(productId, size);
        removedFromCart(`${productTitle} (${size})`);
    };

    const handleProductClick = (product: IProductItem, onClose?: () => void) => {
        modalStore.openProductModal(product);
        if (onClose) onClose();
    };

    return {
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveFromCart,
        handleProductClick,
        cartStore
    };
};