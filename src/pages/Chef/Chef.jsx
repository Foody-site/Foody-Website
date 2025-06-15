import ChefFilter from '../../components/shared/filters/ChefFilter'
import AllChefs from '../../components/once/AllChefs'
import Hero from '../../components/common/Hero'

const Chef = () => {
    return (
        <div>
            <Hero />
            <div className='flex'>
            <ChefFilter />
            <AllChefs />
            </div>
        </div>
    )
}

export default Chef