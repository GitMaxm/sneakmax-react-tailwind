interface SizeFilterProps {
  selectedSizes: number[];
  setSelectedSizes: (sizes: number[]) => void;
}

const SizeFilter = ({
  selectedSizes,
  setSelectedSizes,
}: SizeFilterProps) => {
  const handleSizeChange = (size: number) => {
    setSelectedSizes(
      selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size],
    );
  };

  return (
    <div className="filter-size mb-6">
      <p className="mb-2 text-sm font-medium">Размер</p>
      <div className="grid grid-cols-3 gap-2">
        {[35, 36, 37, 38, 39, 40, 41, 42, 43].map((size) => (
          <label
            key={size}
            className={`cursor-pointer rounded border
            border-[var(--small-text)] py-2 text-center
            transition-colors ${
              selectedSizes.includes(size)
                ? 'bg-[var(--small-text)] text-white'
                : 'hover:bg-[var(--small-text)] hover:text-white'
            }`}
          >
            <input
              type="checkbox"
              value={size}
              className="appearance-none"
              id={`size${size}`}
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
            <span className="cursor-pointer">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
