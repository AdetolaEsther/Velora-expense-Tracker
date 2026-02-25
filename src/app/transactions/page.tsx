"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import StatCard from "@/src/component/StatsCard";
import { Transaction } from "@/src/interface/transaction-types";
import { TransactionTable } from "../transactions/components/TransactionTable";
import NavLayout from "@/src/component/LayoutCom";
import TransferModal from "@/src/modals/TransferModal";
import TransactionFilters from "@/src/component/FilterCom";
interface Filters {
    dateRange?: string; 
    category?: string; 
}
const Page = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({}); 

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

    const handleExportCSV = () => {
        if (!transactions.length) return;
        const headers = ["ID", "Name", "Category", "Date", "Amount", "Type"];

        const rows = transactions.map((tx) => [
            tx.id,
            tx.name,
            tx.category,
            new Date(tx.date).toLocaleString(),
            tx.amount,
            tx.type,
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;",});
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  const handleFilterChange = (newFilters: Filters) => {
      setFilters(newFilters);
  };

  const getFilteredTransactions = () => {
        let filtered = [...transactions];
        if (filters.category) {
            filtered = filtered.filter(
                (tx) => tx.category === filters.category,
            );
        }

        if (filters.dateRange) {
            const now = new Date();

            filtered = filtered.filter((tx) => {
                const txDate = new Date(tx.date);

                switch (filters.dateRange) {
                    case "TODAY":
                        return txDate.toDateString() === now.toDateString();

                    case "YESTERDAY":
                        const yesterday = new Date();
                        yesterday.setDate(now.getDate() - 1);
                        return (
                            txDate.toDateString() === yesterday.toDateString()
                        );

                    case "LAST_7_DAYS":
                        const last7 = new Date();
                        last7.setDate(now.getDate() - 7);
                        return txDate >= last7;

                    case "LAST_30_DAYS":
                        const last30 = new Date();
                        last30.setDate(now.getDate() - 30);
                        return txDate >= last30;

                    default:
                        return true;
                }
            });
        }
        return filtered;
    };

    const calculateMetrics = () => {
        const now = new Date();
        let totalIncoming = 0;
        let totalOutgoing = 0;
        let monthlyBalance = 0;

        transactions.forEach((tx) => {
            const txDate = new Date(tx.date);
            const monthMatch =
                txDate.getMonth() === now.getMonth() &&
                txDate.getFullYear() === now.getFullYear();

            if (tx.type === "income") {
                totalIncoming += Number(tx.amount);
                if (monthMatch) monthlyBalance += Number(tx.amount);
            } else if (tx.type === "expense") {
                totalOutgoing += Number(tx.amount);
                if (monthMatch) monthlyBalance -= Number(tx.amount);
            }
        });

        return { totalIncoming, totalOutgoing, monthlyBalance };
    };

    const { totalIncoming, totalOutgoing, monthlyBalance } = calculateMetrics();


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
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-white  border border-[#e4dcdf]  rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                            onClick={handleExportCSV}
                        >
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
                        amount={`₦${totalIncoming.toLocaleString()}`}
                        trend="↑ 12.5% vs Last Period" // you can calculate trends separately
                        color="#058758"
                        icon="ic:baseline-payments"
                    />
                    <StatCard
                        title="Total Outgoing"
                        amount={`₦${totalOutgoing.toLocaleString()}`}
                        trend="↓ 4.2% Well Managed"
                        color="#e85709"
                        icon="ic:baseline-shopping-cart"
                    />
                    <StatCard
                        title="Monthly Balance"
                        amount={`₦${monthlyBalance.toLocaleString()}`}
                        trend="↑ 8.1% Compounded"
                        color="#8a5cf6"
                        icon="ic:baseline-auto-awesome"
                    />
                </div>
                <TransactionFilters
                    onChange={handleFilterChange}
                    categories={transactions?.map((t) => t.category) || []}
                />

                {/* <TransactionTable
                    transactions={transactions}
                    isFetching={loading}
                /> */}
                <TransactionTable
                    transactions={getFilteredTransactions()}
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
