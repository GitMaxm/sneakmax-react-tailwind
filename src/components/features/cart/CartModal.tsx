import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/Context/rootStoreContext';
import { useModal } from '@/hooks/useModal';
import { useCartActions } from '@/hooks/useCartActions';
import Button from '@/components/ui/Button';
import type { ICartItem } from '@/types/products';

const CartModal = observer(() => {
  const [isProductsShown, setIsProductsShown] = useState(false);
  const { modalCartOpen } = useStores();
  const {
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
    handleProductClick,
    cartStore,
  } = useCartActions();

  const { modalRef } = useModal({
    onClose: modalCartOpen.closeCartModal,
    isOpen: modalCartOpen.isCartModalOpen,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    preventScroll: true,
  });

  const handleCartProductsShow = () => {
    setIsProductsShown(!isProductsShown);
  };

  if (!modalCartOpen.isCartModalOpen) return null;

  return (
    <div
      className="product-modal fixed inset-0 z-[1000] flex
        items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
        onClick={modalCartOpen.closeCartModal}
      />

      <div
        ref={modalRef}
        className="custom-scrollbar relative z-10 max-h-[90vh] w-full
          max-w-xl overflow-y-auto rounded-lg bg-white shadow-xl"
      >
        <button
          onClick={modalCartOpen.closeCartModal}
          type="button"
          className="absolute top-1 right-3 cursor-pointer text-3xl
            text-gray-500 transition-colors hover:text-gray-700"
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>

        <div className="p-4 pt-10 sm:p-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Корзина</h3>
            <span className="text-gray-500">Заказ 3456 67</span>
          </div>

          <div
            className="mb-10 flex flex-col gap-5 rounded border
              border-gray-300 p-6"
          >
            <p>
              Товаров в заказе:{' '}
              <span className="font-bold">
                {cartStore.totalItems}
              </span>
            </p>

            <div className="space-y-2">
              {cartStore.hasDiscountItems && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Стоимость без скидки:
                  </span>
                  <span className="text-gray-400 line-through">
                    {cartStore.totalOriginalPrice} ₽
                  </span>
                </div>
              )}

              {cartStore.totalDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span>Скидка:</span>
                  <span className="text-green-600">
                    -{cartStore.totalDiscount} ₽
                  </span>
                </div>
              )}

              <div
                className="flex items-center justify-between border-t
                  pt-2 text-sm font-bold sm:text-lg"
              >
                <span>Итоговая сумма:</span>
                <span>{cartStore.totalPrice} ₽</span>
              </div>
            </div>

            <p
              onClick={handleCartProductsShow}
              className="flex cursor-pointer items-center gap-2
                hover:opacity-70"
            >
              Состав заказа
              <svg
                className={`transform transition-transform
                  duration-200
                  ${isProductsShown ? 'rotate-180' : 'rotate-0'}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>

            {isProductsShown && (
              <div
                className="custom-scrollbar max-h-80 space-y-4
                  overflow-y-auto"
              >
                {cartStore.cartItems.length > 0 ? (
                  cartStore.cartItems.map((item: ICartItem) => {
                    const originalPrice =
                      item.product.priceOld || item.product.priceMain;
                    const hasDiscount = !!item.product.priceOld;

                    return (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex flex-wrap items-center
                          justify-between gap-2 border-b-1
                          border-gray-300 pb-4"
                      >
                        <div className="flex gap-2">
                          <div className="w-20 flex-shrink-0">
                            <img
                              src={`img/catalog/product/${item.product.imgMain}`}
                              alt={item.product.title}
                              className="h-full w-full cursor-pointer
                                rounded object-cover"
                              onClick={() =>
                                handleProductClick(
                                  item.product,
                                  modalCartOpen.closeCartModal,
                                )
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className="mb-1 line-clamp-2
                                cursor-pointer text-sm font-medium
                                hover:text-blue-600"
                              onClick={() =>
                                handleProductClick(
                                  item.product,
                                  modalCartOpen.closeCartModal,
                                )
                              }
                            >
                              {item.product.title}
                            </p>
                            <p className="mb-2 text-xs text-gray-500">
                              Размер: {item.selectedSize}
                            </p>

                            <div className="flex items-center gap-2">
                              {hasDiscount ? (
                                <>
                                  <span
                                    className="text-sm text-gray-400
                                      line-through"
                                  >
                                    {originalPrice} ₽
                                  </span>
                                  <span
                                    className="text-sm font-bold
                                      sm:text-lg"
                                  >
                                    {item.product.priceMain} ₽
                                  </span>
                                </>
                              ) : (
                                <span
                                  className="text-sm font-bold
                                    sm:text-lg"
                                >
                                  {item.product.priceMain} ₽
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                )
                              }
                              className="flex h-6 w-6 cursor-pointer
                                items-center justify-center rounded
                                border border-gray-300 text-sm
                                hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">
                              {item.quantity} шт.
                            </span>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                )
                              }
                              className="flex h-6 w-6 cursor-pointer
                                items-center justify-center rounded
                                border border-gray-300 text-sm
                                hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="flex-shrink-0 cursor-pointer
                              rounded p-2 hover:bg-gray-100"
                            onClick={() =>
                              handleRemoveFromCart(
                                item.product.id,
                                item.selectedSize,
                                item.product.title,
                              )
                            }
                          >
                            <img
                              src="img/header/trash.svg"
                              alt="Удалить"
                              className="h-5 w-5"
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="py-4 text-center text-gray-500">
                    Корзина пуста
                  </p>
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
