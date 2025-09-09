import React, { useState, useEffect } from "react";

interface PriceFilterProps {
    minLimit: number; // минимальное значение диапазона
    maxLimit: number; // максимальное значение диапазона
    priceMin: number; // текущее выбранное минимальное значение
    priceMax: number; // текущее выбранное максимальное значение
    onPriceChange: (min: number, max: number) => void; // колбэк при изменении значений
}

export const PriceFilter = React.memo(
    ({ minLimit, maxLimit, priceMin, priceMax, onPriceChange }: PriceFilterProps) => {
        const [inputMin, setInputMin] = useState(priceMin.toString());
        const [inputMax, setInputMax] = useState(priceMax.toString());

        // синхронизация, если пропсы изменились извне
        useEffect(() => {
            setInputMin(priceMin.toString());
            setInputMax(priceMax.toString());
        }, [priceMin, priceMax]);

        const getPercent = (value: number) =>
            ((value - minLimit) / (maxLimit - minLimit)) * 100;

        // валидация для MIN
        const handleBlurMin = () => {
            let value = Number(inputMin);

            if (isNaN(value)) value = minLimit;
            if (value < minLimit) value = minLimit;
            if (value >= priceMax) value = priceMax - 1;

            // фиксируем в инпуте сразу
            setInputMin(value.toString());
            onPriceChange(value, priceMax);
        };

        // валидация для MAX
        const handleBlurMax = () => {
            let value = Number(inputMax);

            if (isNaN(value)) value = maxLimit;
            if (value > maxLimit) value = maxLimit;
            if (value <= priceMin) value = priceMin + 1;

            setInputMax(value.toString());
            onPriceChange(priceMin, value);
        };

        const handleSliderMinChange = (value: number) => {
            if (value >= priceMax) value = priceMax - 1;
            onPriceChange(value, priceMax);
        };

        const handleSliderMaxChange = (value: number) => {
            if (value <= priceMin) value = priceMin + 1;
            onPriceChange(priceMin, value);
        };

        return (
            <div className="filter-price mb-6">
                <p className="text-sm font-medium mb-2">Цена, руб</p>

                <div className="flex gap-2 mb-3 filter-price__inputs">
                    <input
                        type="number"
                        className="w-1/2 p-2 filter-input border rounded"
                        value={inputMin}
                        onChange={(e) => setInputMin(e.target.value)}
                        onBlur={handleBlurMin}
                    />
                    <input
                        type="number"
                        className="w-1/2 p-2 filter-input border rounded"
                        value={inputMax}
                        onChange={(e) => setInputMax(e.target.value)}
                        onBlur={handleBlurMax}
                    />
                </div>

                <div className="relative h-10 mt-2">
                    <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-300 rounded" />

                    <div
                        className="absolute top-1/2 -translate-y-1/2 h-1 bg-[var(--text-color-main)] rounded"
                        style={{
                            left: `${getPercent(priceMin)}%`,
                            width: `${getPercent(priceMax) - getPercent(priceMin)}%`,
                        }}
                    />

                    <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        step={1}
                        value={priceMin}
                        onChange={(e) => handleSliderMinChange(Number(e.target.value))}
                        className="range-thumb z-20"
                    />

                    <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        step={1}
                        value={priceMax}
                        onChange={(e) => handleSliderMaxChange(Number(e.target.value))}
                        className="range-thumb z-10"
                    />
                </div>
            </div>
        );
    }
);
