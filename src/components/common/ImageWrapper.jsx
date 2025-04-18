import React from 'react'
import PageWrapper from './PageWrapper'

const ImageWrapper = ({ img }) => {
    return (
        <PageWrapper>
                <img src={img} alt={img} className='w-full h-96' />
        </PageWrapper>
    )
}

export default ImageWrapper