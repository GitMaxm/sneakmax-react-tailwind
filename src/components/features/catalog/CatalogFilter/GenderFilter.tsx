interface GenderProps {
    selectedGender?: string;
    setSelectedGender: (gender: string) => void;
}

const GenderFilter = ({ selectedGender, setSelectedGender }: GenderProps) => {

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
    };

    return (
        <div className="mb-6">
            <p className="text-sm font-medium mb-2">Пол</p>
            <div className="flex justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={selectedGender === 'Male'}
                        onChange={(e) => handleGenderChange(e.target.value)}
                        className="h-6 w-6 filter-input appearance-none cursor-pointer checked:bg-[var(--small-text)]"
                    />
                    <span className="select-none">Мужской</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={selectedGender === 'Female'}
                        onChange={(e) => handleGenderChange(e.target.value)}
                        className="h-6 w-6 filter-input appearance-none cursor-pointer checked:bg-[var(--small-text)]"
                    />
                    <span className="select-none">Женский</span>
                </label>
            </div>
        </div>
    );
}

export default GenderFilter;