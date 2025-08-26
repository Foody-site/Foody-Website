import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import FoodFilter from "../../components/shared/filters/FoodFilter";
import Store from "../../components/once/Store";
import PageWrapper from "../../components/common/PageWrapper";
import Hero from "../../components/common/Hero";
import Chef from "../Chef/Chef";
import Recipe from "../Recipe/Recipe";
import CategoryTabs from "../../components/shared/category/CategoryTabs";
import FoodFilterWrapper from "../../components/shared/wrapper/FoodFilterWrapper";

const defaultView = {
    label: "مطاعم",
    type: "category",
    enum: "restaurant",
};

const Home = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState(defaultView);

    const chefRef = useRef(null);
    const recipeRef = useRef(null);
    const restaurantRef = useRef(null);

    useEffect(() => {
        const savedTab = sessionStorage.getItem("tabState");
        const stateFromNav = location.state;

        if (stateFromNav) {
            setView(stateFromNav);
            sessionStorage.setItem("tabState", JSON.stringify(stateFromNav));

            setTimeout(() => {
                const sectionMap = {
                    Chef: chefRef,
                    Recipe: recipeRef,
                    restaurant: restaurantRef,
                };

                const ref =
                    stateFromNav.type === "component"
                        ? sectionMap[stateFromNav.component]
                        : sectionMap[stateFromNav.enum];

                if (ref?.current) {
                    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else if (savedTab) {
            setView(JSON.parse(savedTab));
        }
    }, [location.key]);

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
                {/* Chef Section */}
                <div ref={chefRef}>
                    {view.type === "component" && view.component === "Chef" && <Chef />}
                </div>

                {/* Recipe Section */}
                <div ref={recipeRef}>
                    {view.type === "component" && view.component === "Recipe" && <Recipe />}
                </div>

                {/* Restaurant/Store Section */}
                <div ref={restaurantRef}>
                    {view.type === "category" && (
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <CategoryTabs
                                        onCategoryChange={handleCategoryChange}
                                        activeTabLabel={view.label}
                                    />
                                    <Store searchTerm={searchTerm} categoryType={view.enum} />
                                </div>
                                <div className="w-auto">
                                    <FoodFilterWrapper onSearch={handleSearch} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PageWrapper>
        </div>
    );
};

export default Home;