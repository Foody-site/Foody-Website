const options = [
    "مفتوح الآن",
    "الاقرب اليك",
    "جلسات داخلية",
    "جلسات خارجية",
    "يوجد توصيل",
    "جلسات عائلية",
    "يوجد حجز مسبق",
    "أضيف حديثاً",
];

const MoreChoicesFilter = ({
    selectedOptions,
    setSelectedOptions,
    setCoordinates,
}) => {
    const toggleSelection = (value) => {
        const updatedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter((item) => item !== value)
            : [...selectedOptions, value];

        setSelectedOptions(updatedOptions);

        if (value === "الاقرب اليك") {
            if (!selectedOptions.includes("الاقرب اليك")) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setCoordinates({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            });
                        },
                        (error) => {
                            console.error("Geolocation error:", error);
                            setCoordinates(null);
                        }
                    );
                } else {
                    console.warn("Geolocation not supported.");
                    setCoordinates(null);
                }
            } else {
                // now deselected
                setCoordinates(null);
            }
        }
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