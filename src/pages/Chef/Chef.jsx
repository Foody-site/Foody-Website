import { useState } from "react";
import { useNavigate } from "react-router";
import ChefFilter from "../../components/shared/filters/ChefFilter";
import AllChefs from "../../components/once/AllChefs";
import CategoryTabs from "../../components/shared/category/CategoryTabs";
import ChefFilterWrapper from "../../components/shared/wrapper/ChefFilterWrapper";

const Chef = () => {
    const [activeTab, setActiveTab] = useState("الشيفات");
    const [searchParams, setSearchParams] = useState({});
    const navigate = useNavigate();

    const handleCategoryChange = (selectedTab) => {
        setActiveTab(selectedTab.label);
        if (selectedTab.type === "category") {
            navigate("/", { state: selectedTab });
        }
    };

    return (
        <div>
                <div className="w-full flex gap-4 mt-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <CategoryTabs
                            onCategoryChange={handleCategoryChange}
                            activeTabLabel={activeTab}
                        />
                        <AllChefs searchParams={searchParams} />
                    </div>

                    <div>
                        <ChefFilterWrapper onSearch={setSearchParams} />
                    </div>
                </div>
        </div>
    );
};

export default Chef;