// components/ProductSizeModal.tsx
import { observer } from 'mobx-react-lite';
import { useModal } from '@/hooks/useModal';
import { useSizeSelection } from '@/hooks/useSizeSelection';
import type { IProductItem } from "@/types/products.d";

interface ProductSizeModalProps {
    isOpen: boolean;
    product: IProductItem;
    onClose: () => void;
    onAddToCart: (size: number) => void;
}

const ProductSizeModal = observer(({
    isOpen,
    product,
    onClose,
    onAddToCart
}: ProductSizeModalProps) => {
    const { handleSizeSelect, resetSizeSelection } = useSizeSelection();

    const { modalRef } = useModal({
        onClose: () => {
            resetSizeSelection();
            onClose();
        },
        isOpen,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        preventScroll: true
    });

    const handleSizeClick = (size: number) => {
        handleSizeSelect(size);
        onAddToCart(size);
        resetSizeSelection();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal content */}
            <div
                ref={modalRef}
                className="relative z-10 w-80 bg-white rounded-lg shadow-xl p-6"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl transition-colors cursor-pointer"
                    aria-label="Закрыть модальное окно"
                >
                    &times;
                </button>

                <h3 className="text-lg font-medium mb-4 text-center">
                    Выберите размер
                </h3>

                <p className="text-sm text-gray-600 mb-4 text-center">
                    {product.title}
                </p>

                {/* Sizes grid */}
                <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {product.size.map(size => (
                        <button
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            className="border rounded px-3 py-2 text-sm transition-colors border-gray-300 hover:bg-gray-100 cursor-pointer"
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700 underline cursor-pointer"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ProductSizeModal;