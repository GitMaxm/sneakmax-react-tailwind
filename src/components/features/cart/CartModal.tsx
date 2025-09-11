// features/cart/CartModal.tsx
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/Context/rootStoreContext";
import { useModal } from "@/hooks/useModal";
import { useCartActions } from "@/hooks/useCartActions";
import Button from "@/components/ui/Button";

const CartModal = observer(() => {
    const [isProductsShown, setIsProductsShown] = useState(false);
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

    const handleCartProductsShow = () => {
        setIsProductsShown(!isProductsShown);
    };

    if (!modalCartOpen.isCartModalOpen) return null;

    return (
        <div className="product-modal fixed inset-0 z-[1000] flex items-center justify-center">
            <div
                className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
                onClick={modalCartOpen.closeCartModal}
            />

            <div
                ref={modalRef}
                className="custom-scrollbar relative z-10 w-full max-w-xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
            >
                <button
                    onClick={modalCartOpen.closeCartModal}
                    type="button"
                    className="absolute top-1 right-3 text-gray-500 hover:text-gray-700 text-3xl transition-colors cursor-pointer"
                    aria-label="Закрыть модальное окно"
                >
                    &times;
                </button>

                <div className="p-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Корзина</h3>
                        <span className="text-gray-500">Заказ 3456 67</span>
                    </div>

                    <div className="border rounded border-gray-300 p-6 flex flex-col gap-5 mb-10">
                        <p>Товаров в заказе: <span className="font-bold">{cartStore.totalItems}</span></p>

                        {/* Отображение цен и скидки */}
                        <div className="space-y-2">
                            {/* Общая стоимость без скидки */}
                            {cartStore.hasDiscountItems && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Стоимость без скидки:</span>
                                    <span className="text-gray-400 line-through">
                                        {cartStore.totalOriginalPrice} ₽
                                    </span>
                                </div>
                            )}

                            {/* Скидка */}
                            {cartStore.totalDiscount > 0 && (
                                <div className="flex justify-between items-center">
                                    <span>Скидка:</span>
                                    <span className="text-green-600">-{cartStore.totalDiscount} ₽</span>
                                </div>
                            )}

                            {/* Итоговая сумма */}
                            <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                                <span>Итоговая сумма:</span>
                                <span>{cartStore.totalPrice} ₽</span>
                            </div>
                        </div>

                        <p onClick={handleCartProductsShow} className="cursor-pointer hover:opacity-70 flex items-center gap-2">
                            Состав заказа
                            <svg
                                className={`transform transition-transform duration-200 ${isProductsShown ? 'rotate-180' : 'rotate-0'}`}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </p>

                        {isProductsShown && (
                            <div className="overflow-y-auto custom-scrollbar max-h-80 space-y-4">
                                {cartStore.cartItems.length > 0 ? (
                                    cartStore.cartItems.map((item) => {
                                        const originalPrice = item.product.priceOld || item.product.priceMain;
                                        const hasDiscount = !!item.product.priceOld;

                                        return (
                                            <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center justify-between gap-3">
                                                <div className="w-20 flex-shrink-0">
                                                    <img
                                                        src={`/img/catalog/product/${item.product.imgMain}`}
                                                        alt={item.product.title}
                                                        className="w-full h-full object-cover cursor-pointer rounded"
                                                        onClick={() => handleProductClick(item.product, modalCartOpen.closeCartModal)}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p
                                                        className="text-sm font-medium mb-1 cursor-pointer hover:text-blue-600 line-clamp-2"
                                                        onClick={() => handleProductClick(item.product, modalCartOpen.closeCartModal)}
                                                    >
                                                        {item.product.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mb-2">Размер: {item.selectedSize}</p>

                                                    {/* Цены для товара */}
                                                    <div className="flex items-center gap-2">
                                                        {hasDiscount ? (
                                                            <>
                                                                <span className="text-gray-400 line-through text-sm">
                                                                    {originalPrice} ₽
                                                                </span>
                                                                <span className="text-lg font-bold">
                                                                    {item.product.priceMain} ₽
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-lg font-bold">
                                                                {item.product.priceMain} ₽
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className="flex items-center gap-2">
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
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded cursor-pointer flex-shrink-0"
                                                    onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize, item.product.title)}
                                                >
                                                    <img src="/img/header/trash.svg" alt="Удалить" className="w-5 h-5" />
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-gray-500 py-4">Корзина пуста</p>
                                )}
                            </div>
                        )}
                    </div>

                    <Button
                        as="button"
                        ariaLabel="Оформить заказ"
                        disabled={cartStore.cartItems.length === 0}
                        className="w-full py-3 text-lg"
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default CartModal;