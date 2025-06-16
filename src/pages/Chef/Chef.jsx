import ChefFilter from '../../components/shared/filters/ChefFilter'
import AllChefs from '../../components/once/AllChefs'
import Hero from '../../components/common/Hero'
import PageWrapper from '../../components/common/PageWrapper'

const Chef = () => {
    return (
        <div>
            <Hero />
            <PageWrapper>
                <div className='flex'>
                    <ChefFilter />
                    <AllChefs />
                </div>
            </PageWrapper>
        </div>
    )
}

export default Chef