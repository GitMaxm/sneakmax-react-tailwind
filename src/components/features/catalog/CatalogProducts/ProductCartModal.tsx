// components/ProductCartModal.tsx
import { observer } from "mobx-react-lite";
import { useModal } from '@/hooks/useModal';
import { useSizeSelection } from '@/hooks/useSizeSelection';
import Button from "@/components/ui/Button";

import type { IProductItem } from "@/types/products";

interface ProductCartModalProps {
    isOpen: boolean;
    product: IProductItem | null;
    onClose: () => void;
    handleAddToCart: (product: IProductItem, size: number) => void;
}

const ProductCartModal = observer(({
    isOpen,
    product,
    onClose,
    handleAddToCart
}: ProductCartModalProps) => {

    const { selectedSize, handleSizeSelect, resetSizeSelection } = useSizeSelection();

    const { modalRef } = useModal({
        onClose: () => {
            resetSizeSelection();
            onClose();
        },
        isOpen: isOpen,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        preventScroll: true
    });

    if (!isOpen || !product) return null;

    const handleModalAddToCart = () => {
        if (!selectedSize) return;
        handleAddToCart(product, selectedSize);
        resetSizeSelection();
        onClose();
    };

    return (
        <div className="product-modal fixed inset-0 z-[1000] flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm" />

            {/* Modal content */}
            <div
                ref={modalRef}
                className="custom-scrollbar relative z-10 w-[90%] max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
            >
                {/* Close button */}
                <button
                    onClick={() => {
                        resetSizeSelection();
                        onClose();
                    }}
                    type="button"
                    className="absolute top-1 right-3 text-gray-500 hover:text-gray-700 text-2xl transition-colors cursor-pointer"
                    aria-label="Закрыть модальное окно"
                >
                    &times;
                </button>

                {/* Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-7">
                    {/* Image section */}
                    <div className="aspect-square bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                        <img
                            src={`/img/catalog/product/${product.imgMain}`}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Product info */}
                    <div className="flex flex-col">
                        <div className="flex justify-between text-gray-500 text-sm mb-4">
                            <span>Артикул: {product.article}</span>
                            <span>В наличии: <span className="text-gray-800">{product.quantity}</span> шт</span>
                        </div>

                        <h2 className="text-2xl font-medium mb-6 leading-snug">
                            {product.title}
                        </h2>

                        {/* Sizes section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Выберите размер</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.size.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeSelect(size)}
                                        className={`border rounded px-4 py-2 transition-colors cursor-pointer ${selectedSize === size
                                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                                            : 'border-gray-300 hover:bg-gray-100'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 my-6">
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
                            {selectedSize ? `Заказать кросовки ${selectedSize} размера` : 'Выберите размер'}
                        </Button>
                    </div>

                    {/* Details section */}
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 mt-6 border-t border-gray-200">
                        <div>
                            <h3 className="text-xl font-medium mb-3">Описание</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mb-3">Характеристики</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>Пол: {product.characteristics.gender === 'Male' ? 'Мужской' : 'Женский'}</li>
                                <li>Цвета: {product.characteristics.color}</li>
                                <li>Состав: {product.characteristics.composition}</li>
                                <li>Страна: {product.characteristics.country}</li>
                                <li>Размеры: {product.size.join(', ')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProductCartModal;