import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/Context/rootStoreContext";
import { useCartToast } from "@/helper/toastHelpers";
import Button from "@/components/ui/Button";
import ProductItem from "./ProductItem";
import ProductCartModal from "./ProductCartModal";
import type { IProductItem } from "@/types/products.d";

const CatalogProducts = observer(() => {
    const [productsVisible, setProductsVisible] = useState(6);
    const { productsStore, filterStore, cartStore, modalStore } = useStores();
    const { addedToCart } = useCartToast();

    // Получаем отфильтрованные товары
    const filteredProducts = productsStore.getFilteredProducts(filterStore.filters);

    useEffect(() => {
        setProductsVisible(6);
    }, [filterStore.filters]);

    const displayedProducts = filterStore.hasActiveFilters
        ? filteredProducts
        : productsStore.products;

    const handleCardShow = (id: string) => {
        const product = productsStore.getProductById(id);
        if (product) {
            modalStore.openProductModal(product);
        }
    };

    const showMore = () => {
        setProductsVisible(prev => prev + 6);
    };

    const handleAddToCart = (product: IProductItem, size: number) => {
        cartStore.addToCart(product, size);
        addedToCart(`${product.title} (размер: ${size})`);
    };

    // 1. Показываем загрузку
    if (productsStore.isLoading) {
        return (
            <div className="w-full lg:w-3/4 min-h-[850px] flex justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Загрузка товаров...</p>
                </div>
            </div>
        );
    }

    // 2. Показываем ошибку
    if (productsStore.error) {
        return (
            <div className="w-full lg:w-3/4 min-h-[850px] flex justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">Ошибка загрузки товаров</p>
                    <p className="text-gray-600 mb-4">{productsStore.error}</p>
                    <Button
                        onClick={productsStore.retryFetch}
                        ariaLabel="Повторить загрузку товаров"
                    >
                        Попробовать снова
                    </Button>
                </div>
            </div>
        );
    }

    // 3. Основной контент (только когда данные загружены и нет ошибок)
    return (
        <>
            <ProductCartModal
                isOpen={modalStore.isProductModalOpen}
                product={modalStore.productModal}
                onClose={() => modalStore.closeProductModal()}
                handleAddToCart={handleAddToCart}
            />

            <div className="w-full lg:w-3/4 min-h-[850px]">
                {/* Информация о фильтрации */}
                {filterStore.hasActiveFilters && (
                    <div className="mb-4 p-3 bg-blue-50 rounded">
                        Найдено {displayedProducts.length} из {productsStore.products.length} товаров
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {displayedProducts
                        .slice(0, productsVisible)
                        .map((product) => (
                            <ProductItem
                                product={product}
                                key={product.id}
                                handleCardShow={handleCardShow}
                                handleAddToCart={handleAddToCart}
                            />
                        ))}
                </div>

                {/* Кнопка "Показать еще" */}
                {displayedProducts.length > productsVisible && (
                    <div className="mt-6 text-center">
                        <Button
                            ariaLabel="Показать еще товары"
                            onClick={showMore}
                        >
                            Показать еще
                        </Button>
                    </div>
                )}

                {/* Сообщение если товаров нет */}
                {displayedProducts.length === 0 && (
                    <div className="mt-6 text-center text-gray-500">
                        {filterStore.hasActiveFilters
                            ? "Товаров по выбранным фильтрам не найдено"
                            : "Товары временно отсутствуют"
                        }
                    </div>
                )}
            </div>
        </>
    );
});

export default CatalogProducts;