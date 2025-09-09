import { CatalogFilter } from "../../components/features/catalog/CatalogFilter";
import CatalogProduct from "../../components/features/catalog/CatalogProducts";

const Catalog = () => {
    return (
        // Каталог
        <section className="bg-white py-5" id="catalog">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Каталог</h2>

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