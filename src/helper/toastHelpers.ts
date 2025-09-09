// utils/toastHelpers.ts
import { useToast } from '../hooks/useToast';

// Хук для уведомлений корзины
export const useCartToast = () => {
    const { showSuccess, showInfo, showError } = useToast();

    const addedToCart = (productTitle: string) => {
        showSuccess(`"${productTitle}" добавлены в корзину!`);
    };

    const errorAddedToCart = (productTitle: string) => {
        showError(`${productTitle}`);
    };

    const quantityIncreased = (productTitle: string) => {
        showInfo(`Количество "${productTitle}" увеличено`);
    };

    const quantityDecreased = (productTitle: string) => {
        showInfo(`Количество "${productTitle}" уменьшено`);
    };

    const removedFromCart = (productTitle: string) => {
        showError(`"${productTitle}" удалены из корзины`);
    };

    const cartCleared = () => {
        showInfo('Корзина очищена');
    };

    return {
        addedToCart,
        quantityIncreased,
        quantityDecreased,
        removedFromCart,
        errorAddedToCart,
        cartCleared
    };
};