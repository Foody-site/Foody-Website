import { useState } from "react";
import { useNavigate } from "react-router";
import ChefFilter from "../../components/shared/filters/ChefFilter";
import AllRecipes from "../../components/once/AllRecipes";
import PageWrapper from "../../components/common/PageWrapper";
import CategoryTabs from "../../components/shared/category/CategoryTabs";

const Recipe = () => {
    const [activeTab, setActiveTab] = useState("وصفات");
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
                <div className="flex gap-4 mt-4">
                    {/* Right Column: ChefFilter (used here as RecipeFilter if shared) */}
                    <div className="w-[250px]">
                        <ChefFilter />
                    </div>

                    {/* Left Column: Tabs + All Recipes */}
                    <div className="flex-1 flex flex-col gap-4">
                        <CategoryTabs
                            onCategoryChange={handleCategoryChange}
                            activeTabLabel={activeTab}
                        />
                        <AllRecipes />
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default Recipe;