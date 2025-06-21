import { useState } from "react";
import { useNavigate } from "react-router";
import ChefFilter from "../../components/shared/filters/ChefFilter";
import AllChefs from "../../components/once/AllChefs";
import PageWrapper from "../../components/common/PageWrapper";
import CategoryTabs from "../../components/shared/category/CategoryTabs";

const Chef = () => {
    const [activeTab, setActiveTab] = useState("الشيفات");
    const navigate = useNavigate();

    const handleCategoryChange = (selectedTab) => {
        setActiveTab(selectedTab.label);

        if (selectedTab.type === "category") {
            navigate("/", { state: selectedTab }); // send full tab object
        }
    };

    return (
        <div>
            <PageWrapper>
                <div className="flex gap-4 mt-4">
                    {/* Right column: Filter */}
                    <div className="w-[250px]">
                        <ChefFilter />
                    </div>

                    {/* Left column: Tabs and chefs */}
                    <div className="flex-1 flex flex-col gap-4">
                        <CategoryTabs
                            onCategoryChange={handleCategoryChange}
                            activeTabLabel={activeTab}
                        />
                        <AllChefs />
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default Chef;