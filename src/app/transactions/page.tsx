"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import StatCard from "@/src/component/StatsCard";
import { Transaction } from "@/src/interface/transaction-types";
import { TransactionTable } from "../transactions/components/TransactionTable";
import NavLayout from "@/src/component/LayoutCom";
import TransferModal from "@/src/modals/TransferModal";
import TransactionFilters from "@/src/component/FilterCom";

const Page = () => {
   
    const [isModalOpen, setModalOpen] = useState(false);
const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const res = await fetch("/api/transactions/get");
            const data = await res.json();
            if (data.success) {
                setTransactions(data.transactions);
            }
        } catch (err) {
            console.error("Failed to fetch:", err);
        } finally {
            setLoading(false);
        }
    };
    const handleFilterChange = (filters: any) => {
        console.log("Selected Filters:", filters);
    };
  useEffect(() => {
            fetchTransactions(); 
    }, []);
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
                    categories={transactions?.map((t) => t.category) || []}
                />

                <TransactionTable
                    transactions={transactions}
                    isFetching={loading}
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
