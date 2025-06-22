import { useState } from "react";
import { useNavigate } from "react-router";
import AllRecipes from "../../components/once/AllRecipes";
import PageWrapper from "../../components/common/PageWrapper";
import CategoryTabs from "../../components/shared/category/CategoryTabs";
import RecipeFilter from "../../components/shared/filters/RecipeFilter";

const Recipe = () => {
    const [activeTab, setActiveTab] = useState("وصفات");
    const [searchParams, setSearchParams] = useState({});
    const navigate = useNavigate();

    const handleCategoryChange = (selectedTab) => {
        setActiveTab(selectedTab.label);
        if (selectedTab.type === "category") {
            navigate("/", { state: selectedTab });
        }
    };

    return (
        <PageWrapper>
            <div className="flex gap-4 mt-4">
                <div className="flex-1 flex flex-col gap-4">
                    <CategoryTabs
                        onCategoryChange={handleCategoryChange}
                        activeTabLabel={activeTab}
                    />
                    <AllRecipes searchParams={searchParams} />
                </div>

                <div className="w-[250px]">
                    <RecipeFilter onSearch={setSearchParams} />
                </div>
            </div>
        </PageWrapper>
    );
};

export default Recipe;