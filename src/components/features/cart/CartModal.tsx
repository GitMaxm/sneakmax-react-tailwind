import { useStores } from "@/Context/rootStoreContext";
import { useModal } from "@/hooks/useModal";
import { observer } from "mobx-react-lite";


const CartModal = observer(() => {
    const { modalCartOpen } = useStores();

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
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
                onClick={() => { modalCartOpen.closeCartModal() }} />

            {/* Modal content */}
            <div
                ref={modalRef}
                className="custom-scrollbar relative z-10 w-[90%] max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
            >
                {/* Close button */}
                <button
                    onClick={() => { modalCartOpen.closeCartModal() }}
                    type="button"
                    className="absolute top-1 right-3 text-gray-500 hover:text-gray-700 text-2xl transition-colors cursor-pointer"
                    aria-label="Закрыть модальное окно"
                >
                    &times;
                </button>

                {/* Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-7 text-black">
                    Корзина
                </div>
            </div>
        </div>
    );
});

export default CartModal;