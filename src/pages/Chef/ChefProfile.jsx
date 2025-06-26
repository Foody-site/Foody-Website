import ImageWrapper from '../../components/common/ImageWrapper'
import ChefPage from '../../components/once/ChefPage'
import herobg from "/assets/home/herobg.webp"

const ChefProfile = () => {
    return (
        <div>
            <ImageWrapper img={herobg} />
            <ChefPage />
        </div>
    )
}

export default ChefProfile