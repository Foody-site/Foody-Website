import ImageWrapper from "../../components/common/ImageWrapper"
import PageWrapper from "../../components/common/PageWrapper"
import ProfileStore from "../../components/once/ProfileStore"
import StoreImg from "/assets/home/StoreImg.png"

const StoreProfile = () => {
    return (
        <div>
            <PageWrapper>
                <ImageWrapper img={StoreImg} />
                <ProfileStore />
            </PageWrapper>
        </div>
    )
}

export default StoreProfile