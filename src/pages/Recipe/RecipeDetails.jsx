import PageWrapper from "../../components/common/PageWrapper";

const RecipeDetails = () => {
    return (
        <PageWrapper>
            <div className="bg-white">
                {/* First Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    {/* Left Column - Info */}
                    <div className="flex flex-col justify-center space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-right">مقلوبة الدجاج بالباذنجان</h2>
                        <p className="text-right text-gray-600 leading-relaxed">
                            وصفة مقلوبة الدجاج بالباذنجان من الشيف عمر وأولاده، تجربة فاخرة لطهي طبق مثالي. يتم تحضير
                            الطبق بطبقات من الأرز، شرائح الباذنجان، وقطع دجاج مطهوة مسبقًا مع بهارات المقلوبة. هذه
                            المكونات تمنح الطبق نكهة غنية وشهية، مما يجعلها مثالية للعزائم أو وجبات العائلة.
                        </p>

                        {/* Chef Info Card */}
                        <div className="border rounded-xl p-4 flex items-center justify-between shadow-sm">
                            {/* Chef Info */}
                            <div className="text-right">
                                <h4 className="font-semibold text-md">هشام ياسين</h4>
                                <p className="text-sm text-gray-500">يشارك وصفاته معنا</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <div className="text-center">
                                    <p className="text-primary-1 font-bold">120</p>
                                    <p className="text-sm text-gray-500">وصفة</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-primary-1 font-bold">456</p>
                                    <p className="text-sm text-gray-500">عدد المتابعين</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-primary-1 font-bold">1700+</p>
                                    <p className="text-sm text-gray-500">عدد المشاهدات</p>
                                </div>
                            </div>

                            {/* Chef Avatar */}
                            <div className="w-16 h-16 rounded-full overflow-hidden border">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Chef"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-end mt-4">
                            <button className="btn btn-outline border-primary-1 text-primary-1">المتابعة</button>
                            <button className="btn bg-primary-1 text-white hover:bg-primary-1/80">أريد الشيف</button>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="rounded-xl overflow-hidden shadow">
                        <img
                            src="https://images.unsplash.com/photo-1606788075760-3ddc1f0c4bfb?auto=format&fit=crop&w=800&q=80"
                            alt="Recipe"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Second Section - Tags + Ingredients */}
                <div className="bg-red-50 rounded-xl p-6 mt-6">
                    <div className="flex flex-col gap-4">
                        {/* Title and Tags */}
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            <h2 className="text-xl font-bold text-right">مقلوبة الدجاج بالباذنجان</h2>
                            <div className="flex flex-wrap gap-2 text-sm justify-end">
                                <span className="badge badge-outline text-xs py-1 px-2">نوع الطعام: رئيسي</span>
                                <span className="badge badge-outline text-xs py-1 px-2">وقت الإعداد: 30 دقيقة</span>
                                <span className="badge badge-outline text-xs py-1 px-2">وقت الطهي: 30 دقيقة</span>
                                <span className="badge badge-outline text-xs py-1 px-2">تكفي لـ 4 أشخاص تقريباً</span>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h3 className="font-semibold text-right mb-2 text-lg">المكونات الرئيسية</h3>
                            <div className="flex flex-wrap gap-2 justify-end">
                                {[
                                    "أرز بسمتي",
                                    "باذنجان",
                                    "دجاج",
                                    "بصل",
                                    "بهارات المقلوبة",
                                    "ماء أو مرق دجاج",
                                    "ملح",
                                    "زيت نباتي",
                                    "1-inch piece of fresh ginger, minced",
                                ].map((item, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-outline text-sm border-gray-300 text-gray-600"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Section - Preparation Steps */}
                <div className="bg-red-50 rounded-xl p-6 mt-6">
                    <h2 className="text-xl font-bold text-right mb-2">خطوات التحضير خطوة بخطوة</h2>
                    <p className="text-right text-gray-600 mb-4">
                        قسم مخصص لعرض طريقة عمل وصفة النجاح بالاتقان بطريقة منظمة وسهلة المتابعة. كل خطوة موضحة مع وصف بسيط لها
                        مما يساعدكم على تتبع الوصفة بدقة دون تعقيد.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "الخطوة الأولى",
                            "الخطوة الثانية",
                            "الخطوة الثالثة",
                            "الخطوة الرابعة",
                            "الخطوة الخامسة",
                            "الخطوة السادسة",
                        ].map((step, idx) => (
                            <div key={idx} className="border rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-primary-1 h-2 w-full" />
                                <div className="p-4 text-right">
                                    <h4 className="font-bold text-md mb-2">{step}</h4>
                                    <p className="text-sm text-gray-500">الوصف</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="btn btn-outline text-primary-1 border-primary-1 flex gap-2">
                            <span className="rotate-180">⬇️</span> مشاهدة المزيد
                        </button>
                    </div>
                </div>

                {/* Fourth Section - Quantities and Ingredients */}
                <div className="bg-red-50 rounded-xl p-6 mt-6">
                    <h2 className="text-xl font-bold text-right mb-2">الكمية و المقادير</h2>
                    <p className="text-right text-gray-600 mb-4">
                        استعرض كل المكونات المطلوبة لتحضير وصفة مقلوبة الدجاج بالباذنجان. كل مكون مكتوب بوزنه المناسب ليسهل
                        على المستخدمين تجهيز المقادير قبل البدء.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: "دقيق أبيض", amount: "3 أكواب (ما يعادل 450 جم)" },
                            { name: "ماء دافئ", amount: "1 كوب (ما يعادل 450 مل)" },
                            { name: "خميرة فورية", amount: "1 ملعقة كبيرة (ما يعادل 15 جم)" },
                            { name: "سكر", amount: "1 ملعقة صغيرة (ما يعادل 5 جم)" },
                            { name: "ملح", amount: "1 ملعقة صغيرة (ما يعادل 5 جم)" },
                            { name: "زيت زيتون", amount: "2 ملعقة كبيرة (ما يعادل 15 مل)" },
                        ].map((item, idx) => (
                            <div key={idx} className="border rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-primary-1 h-2 w-full" />
                                <div className="p-4 text-right">
                                    <h4 className="font-bold text-md mb-2">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="btn btn-outline text-primary-1 border-primary-1 flex gap-2">
                            <span className="rotate-180">⬇️</span> مشاهدة المزيد
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default RecipeDetails;