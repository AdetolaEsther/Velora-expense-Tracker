"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import StatCard from "@/src/component/StatsCard";
import { Transaction } from "@/src/interface/transaction-types";
import { TransactionTable } from "../transactions/components/TransactionTable";
import NavLayout from "@/src/component/LayoutCom";
import TransferModal from "@/src/modals/TransferModal";
import TransactionFilters from "@/src/component/FilterCom";
import { useRouter } from "next/navigation";       
const Page = () => {
    const router = useRouter();
          const [isModalOpen, setModalOpen] = useState(false);

              const [user, setUser] = useState(null);


console.log({user})
    useEffect(() => {
        const storedUser = localStorage.getItem("velora_user");

        if (!storedUser) {
            router.push("/login");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

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

    useEffect(() => {
        const storedUser = localStorage.getItem("velora_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            fetchTransactions(); 
        }
    }, []);

    if (!user) return <div className="h-screen bg-[#FAF9F6]" />;
   
    const handleFilterChange = (filters: any) => {
        console.log("Selected Filters:", filters);
    };

    return (
        <NavLayout>
            <div className="w-full bg-[#FAF9F6] p-2">
                {/* <p className="text-gray-400 text-xs text-center">
                    Logged in as: {user.email}
                </p> */}
                <div className="flex flex-col items-center text-center mb-14">
                    <h1 className="text-gray-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
                        Total Portfolio Value
                    </h1>
                    <p className="text-white text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-6 drop-shadow-lg">
                        $24,560.00
                    </p>
                    <div className="flex items-center gap-2 text-[#6FCF97] font-black bg-[#6FCF97]/20 px-6 py-2 rounded-full text-sm border border-[#6FCF97]/40 shadow-[0_0_20px_rgba(111,207,151,0.1)]">
                        <Icon
                            icon="ic:baseline-trending-up"
                            className="text-sm font-black"
                        />
                        <span className="uppercase tracking-widest">
                            +4.2% Growth
                        </span>
                    </div>
                </div>

                <div className="flex justify-center gap-6 mb-16">
                    <button className="flex-1 md:flex-none md:min-w-[220px] h-14 bg-[#ff3b8d] text-white rounded-xl text-lg font-black flex items-center justify-center gap-3">
                        <Icon
                            icon="ic:baseline-add-circle"
                            className="text-2xl"
                        />
                        Add Funds
                    </button>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex-1 md:flex-none md:min-w-[220px] h-14 bg-[#1E1E1E] text-white border-2 border-white/5 rounded-xl text-lg font-black flex items-center justify-center gap-3"
                    >
                        <Icon
                            icon="ic:baseline-sync-alt"
                            className="text-2xl"
                        />
                        Transfer
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <StatCard
                        title="Net Income"
                        amount="$8,200.00"
                        trend="↑ 12.5% vs Last Period"
                        color="#058758"
                        icon="ic:baseline-payments"
                    />
                    <StatCard
                        title="Monthly Spend"
                        amount="$3,450.00"
                        trend="↓ 4.2% Well Managed"
                        color="#e85709"
                        icon="ic:baseline-shopping-cart"
                    />
                    <StatCard
                        title="Wealth Growth"
                        amount="$1,150.00"
                        trend="↑ 8.1% Compounded"
                        color="##8a5cf6"
                        icon="ic:baseline-auto-awesome"
                    />
                </div>
                <TransactionFilters
                    onChange={handleFilterChange}
                    categories={
                        transactions?.map((t) => t.category) || []
                    }
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
