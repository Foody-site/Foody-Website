import React from 'react'
import ChefFilter from '../../components/shared/filters/ChefFilter'
import herobg from "/assets/home/herobg.png"
import ImageWrapper from '../../components/common/ImageWrapper'

const Chef = () => {
    return (
        <div>
            <ImageWrapper img={herobg} />
            <ChefFilter />
        </div>
    )
}

export default Chef