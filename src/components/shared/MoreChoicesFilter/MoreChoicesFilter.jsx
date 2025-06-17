const options = [
    "مفتوح الآن",
    "جلسات داخلية",
    "جلسات خارجية",
    "يوجد توصيل",
    "جلسات عائلية",
    "يوجد حجز مسبق",
    "أضيف حديثاً",
];

const MoreChoicesFilter = ({ selectedOptions, setSelectedOptions }) => {
    const toggleSelection = (value) => {
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter((item) => item !== value)
                : [...selectedOptions, value]
        );
    };

    return (
        <div>
            <label className="block mb-2 text-white">مزيد من الخيارات</label>
            {options.map((opt) => (
                <label
                    key={opt}
                    className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-lg mb-1"
                >
                    <span>{opt}</span>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes(opt)}
                        onChange={() => toggleSelection(opt)}
                        className="accent-primary-1"
                    />
                </label>
            ))}
        </div>
    );
};

export default MoreChoicesFilter;
