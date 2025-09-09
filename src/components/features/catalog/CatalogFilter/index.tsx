import { observer } from "mobx-react-lite";
import { useStores } from "../../../../Context/rootStoreContext";
import { toJS } from "mobx"; // Добавьте этот импорт

import filterPrice from "../../../../helper/filterPrice";
import GenderFilter from "./GenderFilter";
import { PriceFilter } from "./PriceFilter";
import SizeFilter from "./SizeFilter";

export const CatalogFilter = observer(() => {
    const { filterStore } = useStores();

    const handlePriceChange = (min: number, max: number) => {
        filterStore.setTempPriceMin(min);
        filterStore.setTempPriceMax(max);
    };

    const handleApplyFilter = () => {
        filterStore.applyFilters();
        console.log("Applied filter:", toJS(filterStore.filters));
    };

    const handleResetFilter = () => {
        filterStore.resetFilters();
        console.log("Filters reset");
    };

    return (
        <aside className="w-full lg:w-1/4">
            <div className="bg-[#FFF4EE] p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Подбор по параметрам</h4>

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
                        className="cursor-pointer bg-[var(--text-color-main)] text-[var(--text-color-light)] py-2 px-4 rounded"
                        onClick={handleApplyFilter}
                    >
                        Применить
                    </button>
                    <button
                        className="cursor-pointer text-gray-600 hover:text-gray-800"
                        onClick={handleResetFilter}
                    >
                        Сбросить
                    </button>
                </div>

            </div>
        </aside>
    );
});