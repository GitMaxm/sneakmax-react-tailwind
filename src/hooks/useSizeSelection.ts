import { useState } from 'react';

export const useSizeSelection = () => {
  const [selectedSize, setSelectedSize] = useState<number | null>(
    null,
  );

  const handleSizeSelect = (size: number) => {
    setSelectedSize((prev) => (prev === size ? null : size));
  };

  const resetSizeSelection = () => {
    setSelectedSize(null);
  };

  return {
    selectedSize,
    handleSizeSelect,
    resetSizeSelection,
  };
};
