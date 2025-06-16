import { useState } from "react";
import FoodFilter from '../../components/shared/filters/FoodFilter'
import Store from '../../components/once/Store'
import PageWrapper from '../../components/common/PageWrapper'
import Hero from "../../components/common/Hero";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <Hero />
            <PageWrapper>
                <div className="flex gap-4">
                    <div className="w-auto">
                        <FoodFilter onSearch={handleSearch} />
                    </div>
                    <div className="flex-1">
                        <Store searchTerm={searchTerm} />
                    </div>
                </div>
            </PageWrapper>
        </div>
    )
}

export default Home;