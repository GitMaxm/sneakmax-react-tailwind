import { observer } from 'mobx-react-lite';
import { useModal } from '@/hooks/useModal';
import { useSizeSelection } from '@/hooks/useSizeSelection';
import Button from '@/components/ui/Button';

import type { IProductItem } from '@/types/products';

interface ProductCartModalProps {
  isOpen: boolean;
  product: IProductItem | null;
  onClose: () => void;
  handleAddToCart: (product: IProductItem, size: number) => void;
}

const ProductCartModal = observer(
  ({
    isOpen,
    product,
    onClose,
    handleAddToCart,
  }: ProductCartModalProps) => {
    const { selectedSize, handleSizeSelect, resetSizeSelection } =
      useSizeSelection();

    const { modalRef } = useModal({
      onClose: () => {
        resetSizeSelection();
        onClose();
      },
      isOpen: isOpen,
      closeOnOutsideClick: true,
      closeOnEscape: true,
      preventScroll: true,
    });

    if (!isOpen || !product) return null;

    const handleModalAddToCart = () => {
      if (!selectedSize) return;
      handleAddToCart(product, selectedSize);
      resetSizeSelection();
      onClose();
    };

    return (
      <div
        className="product-modal fixed inset-0 z-[1000] flex
          items-center justify-center"
      >
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm" />

        <div
          ref={modalRef}
          className="custom-scrollbar relative z-10 max-h-[90vh]
            w-[90%] max-w-4xl overflow-y-auto rounded-lg bg-white
            shadow-xl"
        >
          <button
            onClick={() => {
              resetSizeSelection();
              onClose();
            }}
            type="button"
            className="absolute top-1 right-3 cursor-pointer text-2xl
              text-gray-500 transition-colors hover:text-gray-700"
            aria-label="Закрыть модальное окно"
          >
            &times;
          </button>

          <div className="grid grid-cols-1 gap-8 p-7 lg:grid-cols-2">
            <div
              className="flex aspect-square items-center
                justify-center overflow-hidden rounded bg-gray-50"
            >
              <img
                src={`img/catalog/product/${product.imgMain}`}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div
                className="mb-4 flex justify-between text-sm
                  text-gray-500"
              >
                <span>Артикул: {product.article}</span>
                <span>
                  В наличии:{' '}
                  <span className="text-gray-800">
                    {product.quantity}
                  </span>{' '}
                  шт
                </span>
              </div>

              <h2 className="mb-6 text-2xl leading-snug font-medium">
                {product.title}
              </h2>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium">
                  Выберите размер
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`cursor-pointer rounded border px-4
                      py-2 transition-colors ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-6 flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {product.priceMain} ₽
                </span>
                {product.priceOld && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.priceOld} ₽
                  </span>
                )}
              </div>

              <Button
                ariaLabel="Заказать товар. Добавить в корзину"
                className="mt-auto"
                onClick={handleModalAddToCart}
                disabled={!selectedSize}
              >
                {selectedSize
                  ? `Заказать кросовки ${selectedSize} размера`
                  : 'Выберите размер'}
              </Button>
            </div>

            <div
              className="col-span-full mt-6 grid grid-cols-1 gap-8
                border-t border-gray-200 pt-6 md:grid-cols-2"
            >
              <div>
                <h3 className="mb-3 text-xl font-medium">Описание</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-medium">
                  Характеристики
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    Пол:{' '}
                    {product.characteristics.gender === 'Male'
                      ? 'Мужской'
                      : 'Женский'}
                  </li>
                  <li>Цвета: {product.characteristics.color}</li>
                  <li>
                    Состав: {product.characteristics.composition}
                  </li>
                  <li>Страна: {product.characteristics.country}</li>
                  <li>Размеры: {product.size.join(', ')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default ProductCartModal;
