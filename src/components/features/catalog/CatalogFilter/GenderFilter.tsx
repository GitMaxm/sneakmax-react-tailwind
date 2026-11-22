interface GenderProps {
  selectedGender?: string;
  setSelectedGender: (gender: string) => void;
}

const GenderFilter = ({
  selectedGender,
  setSelectedGender,
}: GenderProps) => {
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-medium">Пол</p>
      <div className="flex justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={selectedGender === 'Male'}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="filter-input h-6 w-6 cursor-pointer
              appearance-none checked:bg-[var(--small-text)]"
          />
          <span className="select-none">Мужской</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={selectedGender === 'Female'}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="filter-input h-6 w-6 cursor-pointer
              appearance-none checked:bg-[var(--small-text)]"
          />
          <span className="select-none">Женский</span>
        </label>
      </div>
    </div>
  );
};

export default GenderFilter;
