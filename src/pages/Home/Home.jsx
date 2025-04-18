import React from 'react'
import FoodFilter from '../../components/shared/filters/FoodFilter'
import ImageWrapper from '../../components/common/ImageWrapper'
import herobg from "/assets/home/herobg.png"

const Home = () => {
    return (
        <div>
            <ImageWrapper img={herobg} />
            <FoodFilter />
        </div>
    )
}

export default Home