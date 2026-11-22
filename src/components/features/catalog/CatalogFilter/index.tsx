import { observer } from 'mobx-react-lite';
import { useStores } from '@/Context/rootStoreContext';
import { toJS } from 'mobx';

import filterPrice from '@/helper/filterPrice';
import GenderFilter from './GenderFilter';
import { PriceFilter } from './PriceFilter';
import SizeFilter from './SizeFilter';

export const CatalogFilter = observer(() => {
  const { filterStore } = useStores();

  const handlePriceChange = (min: number, max: number) => {
    filterStore.setTempPriceMin(min);
    filterStore.setTempPriceMax(max);
  };

  const handleApplyFilter = () => {
    filterStore.applyFilters();
    console.log('Applied filter:', toJS(filterStore.filters));
  };

  const handleResetFilter = () => {
    filterStore.resetFilters();
    console.log('Filters reset');
  };

  return (
    <aside className="w-full lg:w-1/4">
      <div
        className="rounded-lg border-1 border-[var(--small-text)]
          bg-[#FFF4EE] p-4"
      >
        <h4 className="mb-4 text-xl font-semibold">
          Подбор по параметрам
        </h4>

        <PriceFilter
          minLimit={filterPrice.MIN}
          maxLimit={filterPrice.MAX}
          priceMin={filterStore.tempPriceMin}
          priceMax={filterStore.tempPriceMax}
          onPriceChange={handlePriceChange}
        />

        <GenderFilter
          selectedGender={filterStore.tempGender}
          setSelectedGender={filterStore.setTempGender}
        />

        <SizeFilter
          selectedSizes={filterStore.tempSizes}
          setSelectedSizes={filterStore.setTempSizes}
        />

        <div className="flex flex-col gap-2">
          <button
            className="cursor-pointer rounded
              bg-[var(--text-color-main)] px-4 py-2
              text-[var(--text-color-light)]"
            onClick={handleApplyFilter}
          >
            Применить
          </button>
          <button
            className="cursor-pointer text-gray-600
              hover:text-gray-800"
            onClick={handleResetFilter}
          >
            Сбросить
          </button>
        </div>
      </div>
    </aside>
  );
});
