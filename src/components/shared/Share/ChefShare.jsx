import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";

const ChefShare = ({ chefId, onShare }) => {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const currentUrl = `${window.location.origin}/chef/${chefId}`;

    const handleCopyAndShare = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            await axios.post(`${api_url}/chef/${chefId}/share`);
            onShare?.();

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy or share failed:", err);
        }
    };

    return (
        <>
            <button
                className="w-10 h-10 flex items-center justify-center border border-primary-1 rounded-lg text-primary-1"
                onClick={() => setVisible(true)}
            >
                <FaShareAlt />
            </button>

            {visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-right">
                        <h3 className="font-bold text-lg mb-4 text-primary-1">مشاركة الشيف</h3>
                        <p className="text-sm text-gray-600 mb-2">رابط الشيف:</p>
                        <div className="flex items-center gap-2">
                            <input
                                readOnly
                                value={currentUrl}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <button
                                onClick={handleCopyAndShare}
                                className="px-4 py-2 bg-primary-1 text-white rounded-md text-sm hover:bg-primary-1/90"
                            >
                                {copied ? "تم النسخ" : "نسخ"}
                            </button>
                        </div>

                        <div className="text-left mt-4">
                            <button
                                onClick={() => setVisible(false)}
                                className="text-sm text-gray-500 hover:underline"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChefShare;