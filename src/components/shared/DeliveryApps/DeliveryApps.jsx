import { FaBiking } from "react-icons/fa";

const DELIVERY_APPS = [
    { key: "keeta", label: "Keeta" },
    { key: "hungerStation", label: "HungerStation" },
    { key: "toyou", label: "ToYou" },
    { key: "mrsool", label: "Mrsool" },
    { key: "theChefz", label: "The Chefz" },
    { key: "mrMandoob", label: "Mr Mandoob" },
    { key: "shgardi", label: "Shgardi" },
    { key: "uber", label: "Uber" },
    { key: "careem", label: "Careem" },
    { key: "noon", label: "Noon" },
    { key: "jahez", label: "Jahez" },
    { key: "other", label: "Other" },
];

const DeliveryApps = ({ selectedApps, setSelectedApps }) => {
    return (
        <div className="relative">
            <div className="absolute left-4 top-3 text-gray-500">
                <FaBiking />
            </div>

            <select
                multiple
                className="w-full appearance-none pl-10 pr-4 py-2 bg-white text-black rounded-lg h-32 overflow-y-auto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedApps}
                onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
                    setSelectedApps(values);
                }}
            >
                <option disabled>قم بإختيار نوع تطبيقات التوصيل</option>
                {DELIVERY_APPS.map((app) => (
                    <option key={app.key} value={app.key}>
                        {app.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DeliveryApps;