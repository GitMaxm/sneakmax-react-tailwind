import { observer } from 'mobx-react-lite';
import { useModal } from '@/hooks/useModal';
import { useSizeSelection } from '@/hooks/useSizeSelection';
import type { IProductItem } from '@/types/products.d';

interface ProductSizeModalProps {
  isOpen: boolean;
  product: IProductItem;
  onClose: () => void;
  onAddToCart: (size: number) => void;
}

const ProductSizeModal = observer(
  ({
    isOpen,
    product,
    onClose,
    onAddToCart,
  }: ProductSizeModalProps) => {
    const { handleSizeSelect, resetSizeSelection } =
      useSizeSelection();

    const { modalRef } = useModal({
      onClose: () => {
        resetSizeSelection();
        onClose();
      },
      isOpen,
      closeOnOutsideClick: true,
      closeOnEscape: true,
      preventScroll: true,
    });

    const handleSizeClick = (size: number) => {
      handleSizeSelect(size);
      onAddToCart(size);
      resetSizeSelection();
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[1000] flex items-center
          justify-center"
      >
        <div
          className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <div
          ref={modalRef}
          className="relative z-10 w-80 rounded-lg bg-white p-6
            shadow-xl"
        >
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 cursor-pointer text-xl
              text-gray-500 transition-colors hover:text-gray-700"
            aria-label="Закрыть модальное окно"
          >
            &times;
          </button>

          <h3 className="mb-4 text-center text-lg font-medium">
            Выберите размер
          </h3>

          <p className="mb-4 text-center text-sm text-gray-600">
            {product.title}
          </p>

          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {product.size.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className="cursor-pointer rounded border
                  border-gray-300 px-3 py-2 text-sm transition-colors
                  hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onClose}
              className="cursor-pointer text-sm text-gray-500
                underline hover:text-gray-700"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default ProductSizeModal;
