"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";

interface ComingSoonProps {
    title?: string;
    description?: string;
    icon?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
    title = "Coming Soon",
    description = "We're working hard to bring this feature to life. Stay tuned 🚀",
    icon = "solar:rocket-bold-duotone",
}) => {
    const router = useRouter();

    return (
        <div className="relative flex items-center justify-center min-h-[60vh] px-6">
            <button
                onClick={() => router.back()}
                className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold text-[#856671] hover:text-black transition-colors"
            >
                <Icon icon="mdi:arrow-left" className="text-lg" />
                Back
            </button>

            <div className="text-center max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[#d7336c]/10">
                    <Icon icon={icon} className="w-10 h-10 text-[#d7336c]" />
                </div>

                <h1 className="text-3xl font-black mb-4 tracking-tight">
                    {title}
                </h1>

                <p className="text-[#856671] font-medium leading-relaxed">
                    {description}
                </p>

                <div className="mt-8 h-[2px] w-16 mx-auto bg-[#d7336c] rounded-full" />
            </div>
        </div>
    );
};

export default ComingSoon;
