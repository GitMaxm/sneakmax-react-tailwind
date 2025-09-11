// features/cart/CartDropdown.tsx
import { observer } from "mobx-react-lite";

import { useStores } from "@/Context/rootStoreContext";
import Button from "@/components/ui/Button";

import { useModal } from "@/hooks/useModal";
import { useCartActions } from "@/hooks/useCartActions";

interface CartDropdownProps {
    onClose: () => void;
    isOpen?: boolean;
}

const CartDropdown = observer(({ onClose, isOpen = true }: CartDropdownProps) => {
    const { modalCartOpen } = useStores();
    const {
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveFromCart,
        handleProductClick,
        cartStore
    } = useCartActions();

    const { modalRef } = useModal({
        onClose,
        isOpen,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        preventScroll: false
    });

    const handleCartModal = () => {
        modalCartOpen.openCartModal();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="absolute right-0 z-[1000] bg-white rounded-b-lg max-w-md w-full shadow-xl max-h-96 overflow-hidden text-black">
            <button
                onClick={onClose}
                type="button"
                className="absolute top-1 right-3 text-gray-500 hover:text-gray-700 text-2xl transition-colors cursor-pointer"
                aria-label="Закрыть модальное окно"
            >
                &times;
            </button>

            <div className="p-4 max-h-64 overflow-y-auto custom-scrollbar">
                {cartStore.cartItems.length > 0 ? (
                    cartStore.cartItems.map((item) => (
                        <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center justify-between gap-3 mb-3">
                            <div className="w-24">
                                <img
                                    src={`/img/catalog/product/${item.product.imgMain}`}
                                    alt={item.product.title}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => handleProductClick(item.product, onClose)}
                                />
                            </div>
                            <div className="flex-1">
                                <p
                                    className="text-sm font-medium mb-1 cursor-pointer hover:text-blue-600"
                                    onClick={() => handleProductClick(item.product, onClose)}
                                >
                                    {item.product.title}
                                </p>
                                <p className="text-xs text-gray-500 mb-2">Размер: {item.selectedSize}</p>
                                <p className="text-xl font-bold">{item.product.priceMain} ₽</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleDecreaseQuantity(item.product.id, item.selectedSize)}
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 text-sm cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-medium">
                                        {item.quantity} шт.
                                    </span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(item.product.id, item.selectedSize)}
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 text-sm cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize, item.product.title)}
                            >
                                <img src="/img/header/trash.svg" alt="Удалить" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">Корзина пуста</p>
                )}
            </div>

            {cartStore.cartItems.length > 0 && (
                <div className="border-t p-4 flex justify-between items-center">
                    <div className="">
                        <p className="text-sm mb-3">Итого:</p>
                        <p className="text-xl font-bold">{cartStore.totalPrice} ₽</p>
                    </div>

                    <Button
                        as="button"
                        ariaLabel="Перейти в корзину"
                        onClick={handleCartModal}>
                        Перейти в корзину
                    </Button>
                </div>
            )}
        </div>
    );
});

export default CartDropdown;