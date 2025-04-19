import React from 'react'
import ChefFilter from '../../components/shared/filters/ChefFilter'
import herobg from "/assets/home/herobg.png"
import ImageWrapper from '../../components/common/ImageWrapper'
import AllChefs from '../../components/once/AllChefs'

const Chef = () => {
    return (
        <div>
            <ImageWrapper img={herobg} />
            <div className='flex'>
            <ChefFilter />
            <AllChefs />
            </div>
        </div>
    )
}

export default Chef