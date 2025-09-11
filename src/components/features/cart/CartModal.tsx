// features/cart/CartModal.tsx
import { observer } from "mobx-react-lite";

import { useStores } from "@/Context/rootStoreContext";

import { useModal } from "@/hooks/useModal";
import { useCartActions } from "@/hooks/useCartActions";

const CartModal = observer(() => {
    const { modalCartOpen } = useStores();
    const {
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveFromCart,
        handleProductClick,
        cartStore
    } = useCartActions();

    const { modalRef } = useModal({
        onClose: modalCartOpen.closeCartModal,
        isOpen: modalCartOpen.isCartModalOpen,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        preventScroll: true
    });

    if (!modalCartOpen.isCartModalOpen) return null;

    return (
        <div className="product-modal fixed inset-0 z-[1000] flex items-center justify-center">
            <div
                className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
                onClick={modalCartOpen.closeCartModal}
            />

            <div
                ref={modalRef}
                className="custom-scrollbar relative z-10 w-[90%] max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
            >
                <button
                    onClick={modalCartOpen.closeCartModal}
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
                                        onClick={() => handleProductClick(item.product, modalCartOpen.closeCartModal)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <p
                                        className="text-sm font-medium mb-1 cursor-pointer hover:text-blue-600"
                                        onClick={() => handleProductClick(item.product, modalCartOpen.closeCartModal)}
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
            </div>
        </div>
    );
});

export default CartModal;