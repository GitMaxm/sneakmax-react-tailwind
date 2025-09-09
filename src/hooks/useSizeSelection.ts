// hooks/useSizeSelection.ts
import { useState } from 'react';

export const useSizeSelection = () => {
    const [selectedSize, setSelectedSize] = useState<number | null>(null); // number | null вместо string

    const handleSizeSelect = (size: number) => {
        setSelectedSize(prev => prev === size ? null : size); // Toggle selection
    };

    const resetSizeSelection = () => {
        setSelectedSize(null);
    };

    return {
        selectedSize,
        handleSizeSelect,
        resetSizeSelection
    };
};