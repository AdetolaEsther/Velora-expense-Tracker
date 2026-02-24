"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface Filters {
    dateRange?: string;
    category?: string;
    paymentMethod?: string;
    amountRange?: string;
}

interface Props {
    onChange: (filters: Filters) => void;
    categories: string[]; 
}
export default function TransactionFilters({ onChange, categories }: Props) {
    const [filters, setFilters] = useState<Filters>({});

const [activePreset, setActivePreset] = useState<string | null>(null);
const [isDateOpen, setIsDateOpen] = useState(false);
const [isCategoryOpen, setIsCategoryOpen] = useState(false);
const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const updateFilter = (key: keyof Filters, value: string) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onChange(updated);
    };

   const resetFilters = () => {
       setFilters({});
       setActivePreset(null);
       setIsDateOpen(false);
       setIsCategoryOpen(false);
       setIsPaymentOpen(false);
       onChange({});
   };
const handlePresetClick = (preset: string) => {
    setActivePreset(preset); 
    updateFilter("dateRange", preset); 
};
    return (
        <div className="bg-white  p-4 rounded-xl border border-[#e4dcdf]  mb-6 shadow-sm flex flex-wrap items-center gap-4">
            <div className="relative">
                {!isDateOpen && (
                    <div
                        onClick={() => setIsDateOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f1f2] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                        <Icon
                            icon="mdi:calendar-month-outline"
                            className="text-lg"
                        />
                        <span className="text-sm font-bold">
                            {activePreset
                                ? activePreset.replaceAll("_", " ")
                                : "Date"}
                        </span>
                        <Icon icon="mdi:chevron-down" className="text-lg" />
                    </div>
                )}

                {isDateOpen && (
                    <div className="flex items-center gap-2">
                        <Icon
                            icon="mdi:calendar-month-outline"
                            className="text-lg cursor-pointer"
                            onClick={() => setIsDateOpen(false)}
                        />

                        <div className="flex border border-gray-300 rounded overflow-hidden bg-white shadow-sm">
                            {[
                                "TODAY",
                                "YESTERDAY",
                                "LAST_7_DAYS",
                                "LAST_30_DAYS",
                            ].map((preset, index) => (
                                <button
                                    key={preset}
                                    onClick={() => {
                                        handlePresetClick(preset);
                                        setIsDateOpen(false);
                                    }}
                                    className={`px-3 py-1 text-xs ${
                                        index !== 3
                                            ? "border-r border-gray-300"
                                            : ""
                                    } ${
                                        activePreset === preset
                                            ? "bg-[#014d4e] text-white font-bold"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {preset.replaceAll("_", " ")}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                {!isCategoryOpen && (
                    <div
                        onClick={() => setIsCategoryOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f1f2] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                        <Icon icon="mdi:shape-outline" className="text-lg" />
                        <span className="text-sm font-bold">
                            {filters.category || "Categories"}
                        </span>
                        <Icon icon="mdi:chevron-down" className="text-lg" />
                    </div>
                )}

                {isCategoryOpen && (
                    <div className="flex items-center gap-2">
                        <Icon
                            icon="mdi:shape-outline"
                            className="text-lg cursor-pointer"
                            onClick={() => setIsCategoryOpen(false)}
                        />

                        <div className="flex border border-gray-300 rounded overflow-hidden bg-white shadow-sm">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        updateFilter("category", category);
                                        setIsCategoryOpen(false);
                                    }}
                                    className={`px-3 py-1 text-xs border-r border-gray-300 ${
                                        filters.category === category
                                            ? "bg-[#014d4e] text-white font-bold"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                {!isPaymentOpen && (
                    <div
                        onClick={() => setIsPaymentOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f1f2] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                        <Icon
                            icon="mdi:credit-card-outline"
                            className="text-lg"
                        />
                        <span className="text-sm font-bold">
                            {filters.paymentMethod || "Payment Method"}
                        </span>
                        <Icon icon="mdi:chevron-down" className="text-lg" />
                    </div>
                )}

                {isPaymentOpen && (
                    <div className="flex items-center gap-2">
                        <Icon
                            icon="mdi:credit-card-outline"
                            className="text-lg cursor-pointer"
                            onClick={() => setIsPaymentOpen(false)}
                        />

                        <div className="flex border border-gray-300 rounded overflow-hidden bg-white shadow-sm">
                            {["wallet", "card"].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => {
                                        updateFilter("paymentMethod", method);
                                        setIsPaymentOpen(false);
                                    }}
                                    className={`px-4 py-1 text-xs border-r border-gray-300 capitalize ${
                                        filters.paymentMethod === method
                                            ? "bg-[#014d4e] text-white font-bold"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            <div
                onClick={resetFilters}
                className="ml-auto flex items-center gap-2 text-[#856671]  cursor-pointer"
            >
                <Icon icon="mdi:filter-off-outline" className="text-lg" />
                <span className="text-sm font-bold">Reset Filters</span>
            </div>
        </div>
    );
}
