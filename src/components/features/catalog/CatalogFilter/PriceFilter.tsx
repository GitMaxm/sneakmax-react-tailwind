import React, { useState, useEffect } from 'react';

interface PriceFilterProps {
  minLimit: number;
  maxLimit: number;
  priceMin: number;
  priceMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export const PriceFilter = React.memo(
  ({
    minLimit,
    maxLimit,
    priceMin,
    priceMax,
    onPriceChange,
  }: PriceFilterProps) => {
    const [inputMin, setInputMin] = useState(priceMin.toString());
    const [inputMax, setInputMax] = useState(priceMax.toString());

    useEffect(() => {
      setInputMin(priceMin.toString());
      setInputMax(priceMax.toString());
    }, [priceMin, priceMax]);

    const getPercent = (value: number) =>
      ((value - minLimit) / (maxLimit - minLimit)) * 100;

    const handleBlurMin = () => {
      let value = Number(inputMin);

      if (isNaN(value)) value = minLimit;
      if (value < minLimit) value = minLimit;
      if (value >= priceMax) value = priceMax - 1;

      setInputMin(value.toString());
      onPriceChange(value, priceMax);
    };

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
        <p className="mb-2 text-sm font-medium">Цена, руб</p>

        <div className="filter-price__inputs mb-3 flex gap-2">
          <input
            type="number"
            className="filter-input w-1/2 rounded border p-2"
            value={inputMin}
            onChange={(e) => setInputMin(e.target.value)}
            onBlur={handleBlurMin}
          />
          <input
            type="number"
            className="filter-input w-1/2 rounded border p-2"
            value={inputMax}
            onChange={(e) => setInputMax(e.target.value)}
            onBlur={handleBlurMax}
          />
        </div>

        <div className="relative mt-2 h-10">
          <div
            className="absolute top-1/2 h-1 w-full -translate-y-1/2
              rounded bg-gray-300"
          />

          <div
            className="absolute top-1/2 h-1 -translate-y-1/2 rounded
              bg-[var(--text-color-main)]"
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
            onChange={(e) =>
              handleSliderMinChange(Number(e.target.value))
            }
            className="range-thumb z-20"
          />

          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            step={1}
            value={priceMax}
            onChange={(e) =>
              handleSliderMaxChange(Number(e.target.value))
            }
            className="range-thumb z-10"
          />
        </div>
      </div>
    );
  },
);
