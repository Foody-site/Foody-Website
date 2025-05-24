import FoodFilter from '../../components/shared/filters/FoodFilter'
import ImageWrapper from '../../components/common/ImageWrapper'
import herobg from "/assets/home/herobg.png"
import Store from '../../components/once/Store'

const Home = () => {
    return (
        <div>
            <ImageWrapper img={herobg} />
            <Store />
            <FoodFilter />
        </div>
    )
}

export default Home