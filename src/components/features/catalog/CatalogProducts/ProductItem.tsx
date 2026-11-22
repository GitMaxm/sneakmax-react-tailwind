import { useState } from 'react';
import { useSizeSelection } from '@/hooks/useSizeSelection';
import ProductSizeModal from './ProductSizeModal';
import type { IProductItem } from '@/types/products.d';

interface ProductItemProps {
  product: IProductItem;
  handleCardShow: (id: string) => void;
  handleAddToCart: (product: IProductItem, size: number) => void;
}

const ProductItem = ({
  product,
  handleCardShow,
  handleAddToCart,
}: ProductItemProps) => {
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const { resetSizeSelection } = useSizeSelection();

  const handleOpenSizeModal = () => {
    setIsSizeModalOpen(true);
  };

  const handleCloseSizeModal = () => {
    resetSizeSelection();
    setIsSizeModalOpen(false);
  };

  const handleSizeSelectAndAdd = (size: number) => {
    handleAddToCart(product, size);
  };

  const MAX_VISIBLE_SIZES = 6;
  const hasManySizes = product.size.length > MAX_VISIBLE_SIZES;
  const remainingSizes = product.size.length - MAX_VISIBLE_SIZES;

  return (
    <div
      className="catalog-product mb-4 flex max-w-[280px] flex-col
        justify-between"
    >
      <div
        className="catalog-product-hover cursor-pointer"
        onClick={() => handleCardShow(product.id)}
      >
        <img
          src={`img/catalog/product/${product.imgCatalog}`}
          alt={product.title}
        />

        <div className="product-buttons">
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Просмотреть товар"
              className="h-5 w-5"
            >
              <img
                src="img/catalog/show.svg"
                alt="Просмотреть товар"
              />
            </button>
          </div>
        </div>
      </div>

      <p
        className="mt-3 mb-1 line-clamp-2 cursor-pointer text-sm
          text-gray-700"
        onClick={() => handleCardShow(product.id)}
      >
        {product.title}
      </p>

      <div className="mb-2 flex flex-wrap gap-2">
        {product.size.slice(0, MAX_VISIBLE_SIZES).map((size) => (
          <button
            key={size}
            className="rounded border border-gray-300 px-2 py-1
              text-xs transition-colors hover:bg-gray-100"
          >
            {size}
          </button>
        ))}

        {hasManySizes && (
          <span className="px-2 py-1 text-xs text-gray-500">
            +{remainingSizes}
          </span>
        )}
      </div>

      <p className="text-lg font-bold text-gray-900">
        {product.priceMain} ₽
        {product.priceOld && (
          <span className="ml-2 text-sm text-gray-400 line-through">
            {product.priceOld} ₽
          </span>
        )}
      </p>

      <button
        type="button"
        onClick={handleOpenSizeModal}
        aria-label="Добавить в корзину"
        className="mt-3 flex w-full cursor-pointer justify-center
          gap-3 rounded-md bg-[var(--bg)] p-3 text-sm text-white
          transition-colors hover:opacity-80"
      >
        <img
          className="h-5 w-5"
          src="img/catalog/cart-add.svg"
          alt="Добавить в корзину"
        />
        Добавить в корзину
      </button>

      <ProductSizeModal
        isOpen={isSizeModalOpen}
        product={product}
        onClose={handleCloseSizeModal}
        onAddToCart={handleSizeSelectAndAdd}
      />
    </div>
  );
};

export default ProductItem;
