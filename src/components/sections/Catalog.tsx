import { CatalogFilter } from "../../components/features/catalog/CatalogFilter";
import CatalogProduct from "../../components/features/catalog/CatalogProducts";

const Catalog = () => {
    return (
        // Каталог
        <section className="bg-white sm:py-15 py-6" id="catalog">
            <div className="container mx-auto px-4">
                <h2 className="title-2 mb-6">Каталог</h2>

                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Фильтр */}
                    <CatalogFilter />

                    {/* Продукты */}
                    <CatalogProduct />

                </div>
            </div>
        </section>);
}

export default Catalog;