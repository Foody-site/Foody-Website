import { useState } from "react";
import FoodFilter from '../../components/shared/filters/FoodFilter'
import ImageWrapper from '../../components/common/ImageWrapper'
import herobg from "/assets/home/herobg.png"
import Store from '../../components/once/Store'
import PageWrapper from '../../components/common/PageWrapper'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <ImageWrapper img={herobg} />
            <PageWrapper>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Store searchTerm={searchTerm} />
                    </div>
                    <div className="w-auto">
                        <FoodFilter onSearch={handleSearch} />
                    </div>
                </div>
            </PageWrapper>
        </div>
    )
}

export default Home;