import { useState } from "react";
import { useNavigate } from "react-router";
import ChefFilter from "../../components/shared/filters/ChefFilter";
import AllChefs from "../../components/once/AllChefs";
import PageWrapper from "../../components/common/PageWrapper";
import CategoryTabs from "../../components/shared/category/CategoryTabs";

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
            <PageWrapper>
                <div className="w-full flex gap-4 mt-4">
                    {/* Right side: content */}
                    <div className="flex-1 flex flex-col gap-4">
                        <CategoryTabs
                            onCategoryChange={handleCategoryChange}
                            activeTabLabel={activeTab}
                        />
                        <AllChefs searchParams={searchParams} />
                    </div>

                    {/* Left side: filters */}
                    <div className="w-[250px] shrink-0">
                        <ChefFilter onSearch={setSearchParams} />
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default Chef;