import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import FoodFilter from "../../components/shared/filters/FoodFilter";
import Store from "../../components/once/Store";
import PageWrapper from "../../components/common/PageWrapper";
import Hero from "../../components/common/Hero";
import Chef from "../Chef/Chef";
import Recipe from "../Recipe/Recipe";
import CategoryTabs from "../../components/shared/category/CategoryTabs";

const defaultView = {
    label: "مطاعم",
    type: "category",
    enum: "restaurant"
};

const Home = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState(defaultView);

    useEffect(() => {
        if (location.state) {
            setView(location.state);
        }
    }, [location.state]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCategoryChange = (selected) => {
        setView(selected);
    };

    return (
        <div>
            <Hero />
            <PageWrapper>
                {view.type === "component" && view.component === "Chef" && <Chef />}
                {view.type === "component" && view.component === "Recipe" && <Recipe />}

                {view.type === "category" && (
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex gap-4">
                            <div className="w-auto">
                                <FoodFilter onSearch={handleSearch} />
                            </div>
                            <div className="flex-1">
                                <CategoryTabs
                                    onCategoryChange={handleCategoryChange}
                                    activeTabLabel={view.label}
                                />
                                <div className="w-full">
                                    <Store searchTerm={searchTerm} categoryType={view.enum} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </PageWrapper>
        </div>
    );
};

export default Home;