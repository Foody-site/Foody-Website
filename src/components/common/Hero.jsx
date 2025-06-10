import { FaFireAlt, FaUtensils, FaArrowLeft } from 'react-icons/fa';
import PageWrapper from './PageWrapper';
import Slider from './Slider';

const Hero = () => {
    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-6 bg-white font-sans p-4">
                {/* Right Side: Slider */}
                <div className="w-full lg:w-1/4 flex justify-center">
                    <Slider />
                </div>

                {/* Left Side: Main Content */}
                <div className="w-full lg:w-3/4">
                    {/* Title and Description */}
                    <div className="max-w-4xl mb-10">
                        <h1 className="text-4xl font-bold mb-4">فودي – حيث يبدأ شغف الطعام!</h1>
                        <p className="text-gray-600 leading-relaxed">
                            منصة فودي هي قاعدة بيانات المعلومات الطعام والمشروبات بالمملكة العربية السعودية، وهي عبارة عن منصة اجتماعية حيث تقدم بيانات تفصيلية
                            وشاملة للمنتجات والخدمات الغذائية والعروض التي تقدمها المطاعم والكافيهات وتعريفها، كما أنها تقدم معلومات عن الطهاة (شيف)
                            ومهاراتهم، وتسهل المنصة على استكشاف الطعام والمشروبات ونشر من نشء الأعمال.
                        </p>
                    </div>

                    {/* عروض وخصومات */}
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h2 className="text-xl font-semibold">عروض وخصومات</h2>
                            <a href="#" className="text-red-500 hover:underline">مشاهدة المزيد</a>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                            {/* Card 1 */}
                            <div className="border-2 border-[#D71313] rounded-lg hover:bg-[#D7131399] transition duration-300 shadow-xl cursor-pointer">
                                <div className="p-6 hover:text-white">
                                    {/* Image + Text Row */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src="https://dummyimage.com/150"
                                            alt="image"
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg">الاسم</h3>
                                            <p className="mt-2">الوصف</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex gap-4 items-center mt-4">
                                        <div className="flex items-center gap-1">
                                            <span>1030 سعر حراري</span>
                                            <FaFireAlt />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>42</span>
                                            <FaUtensils />
                                        </div>
                                    </div>

                                    {/* Link */}
                                    <div className="mt-4 flex items-center gap-1 text-[#D71313] hover:text-white">
                                        <a className="hover:underline">رؤية المزيد</a>
                                        <FaArrowLeft />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="border-2 border-[#D71313] rounded-lg hover:bg-[#D7131399] transition duration-300 shadow-xl cursor-pointer">
                                <div className="p-6 hover:text-white">
                                    {/* Image + Text Row */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src="https://dummyimage.com/150"
                                            alt="image"
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg">الاسم</h3>
                                            <p className="mt-2">الوصف</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex gap-4 items-center mt-4">
                                        <div className="flex items-center gap-1">
                                            <span>1030 سعر حراري</span>
                                            <FaFireAlt />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>42</span>
                                            <FaUtensils />
                                        </div>
                                    </div>

                                    {/* Link */}
                                    <div className="mt-4 flex items-center gap-1 text-[#D71313] hover:text-white">
                                        <a className="hover:underline">رؤية المزيد</a>
                                        <FaArrowLeft />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Hero;