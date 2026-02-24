"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import StatCard from "@/src/component/StatsCard";
import { Transaction } from "@/src/interface/transaction-types";
import { TransactionTable } from "../transactions/components/TransactionTable";
import NavLayout from "@/src/component/LayoutCom";
import TransferModal from "@/src/modals/TransferModal";
import TransactionFilters from "@/src/component/FilterCom";

const Page = () => {
    const RECENT_TRANSACTIONS: Transaction[] = [
        {
            id: 1,
            name: "Nordstrom",
            category: "Lifestyle",
            date: "Oct 24, 2023",
            amount: "-$184.50",
            type: "expense",
            icon: "ic:baseline-shopping-bag",
        },
        {
            id: 2,
            name: "Monthly Salary",
            category: "Income",
            date: "Oct 23, 2023",
            amount: "+$4,100.00",
            type: "income",
            icon: "ic:baseline-payments",
        },
         {
                    id: 3,
                    name: "Electricity Bill",
                    category: "Bills",
                    date: "Oct 23, 2023",
                    amount: "-$120.00",
                    type: "expense",
                    icon: "ic:baseline-electric-bolt",
                },
                {
                    id: 4,
                    name: "Groceries",
                    category: "Food",
                    date: "Oct 23, 2023",
                    amount: "-$150.00",
                    type: "expense",
                    icon: "ic:baseline-shopping-cart",
                },
                {
                    id: 5,
                    name: "Shopping",
                    category: "Lifestyle",
                    date: "Oct 23, 2023",
                    amount: "-$4,100.00",
                    type: "expense",
                    icon: "ic:baseline-shopping-cart",
                },
    ];
    const [isModalOpen, setModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const handleFilterChange = (filters: any) => {
        console.log("Selected Filters:", filters);
    };

    return (
        <NavLayout>
            <div className="w-full bg-[#FAF9F6] p-2">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-[#171214] ">
                            Transactions
                        </h1>
                        <p className="text-[#856671] dark:text-gray-400 mt-1 font-medium">
                            Monitoring your financial flow with elegance.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white  border border-[#e4dcdf]  rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                            <Icon
                                icon="ic:baseline-add-circle"
                                className="text-2xl"
                            />
                            Export CSV
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <StatCard
                        title="Total Incoming"
                        amount="$8,200.00"
                        trend="↑ 12.5% vs Last Period"
                        color="#058758"
                        icon="ic:baseline-payments"
                    />
                    <StatCard
                        title="Total Outgoing"
                        amount="$3,450.00"
                        trend="↓ 4.2% Well Managed"
                        color="#e85709"
                        icon="ic:baseline-shopping-cart"
                    />
                    <StatCard
                        title="Monthly Balance"
                        amount="$1,150.00"
                        trend="↑ 8.1% Compounded"
                        color="##8a5cf6"
                        icon="ic:baseline-auto-awesome"
                    />
                </div>
                <TransactionFilters
                    onChange={handleFilterChange}
                    categories={
                        RECENT_TRANSACTIONS?.map((t) => t.category) || []
                    }
                />
                
                <TransactionTable
                    transactions={RECENT_TRANSACTIONS}
                    isFetching={false}
                />
            </div>
            <TransferModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </NavLayout>
    );
};

export default Page;
