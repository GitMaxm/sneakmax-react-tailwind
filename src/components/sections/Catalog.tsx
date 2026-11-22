import { CatalogFilter } from '../../components/features/catalog/CatalogFilter';
import CatalogProduct from '../../components/features/catalog/CatalogProducts';

const Catalog = () => {
  return (
    <section className="bg-white py-6 sm:py-15" id="catalog">
      <div className="container mx-auto px-4">
        <h2 className="title-2 mb-6">Каталог</h2>

        <div className="flex flex-col gap-6 lg:flex-row">
          <CatalogFilter />

          <CatalogProduct />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
