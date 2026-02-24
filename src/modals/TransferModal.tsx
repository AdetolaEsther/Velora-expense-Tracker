"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
    // 1. State Hooks (Must be at the top)
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("lifestyle");
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(() => {
        return new Date().toISOString().split("T")[0];
    });

    // 2. Conditional return (Must be after state hooks)
    if (!isOpen) return null;

    // 3. Logic
    const handleSave = async () => {
        if (!name || !amount) return alert("Please fill in name and amount");

        setLoading(true);
        try {
            const res = await fetch("/api/transactions/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: uuidv4(),
                    name,
                    category,
                    date,
                    amount: type === "expense" ? `-${amount}` : `+${amount}`,
                    transactionType: type,
                }),
            });

            const data = await res.json();
            if (data.success) {
                alert("Transaction added!");
                // Clear form
                setName("");
                setAmount("");
                onClose();
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
            <div className="bg-white w-full max-w-[480px] rounded-modal shadow-2xl overflow-hidden flex flex-col">
                <div className="px-8 pt-8 pb-4 flex justify-between items-center">
                    <h3 className="text-[#171214] text-2xl font-black tracking-tight">
                        Add New Transaction
                    </h3>
                    <Icon
                        onClick={onClose}
                        width={20}
                        height={20}
                        icon="pajamas:close-xs"
                        className="text-sm font-black cursor-pointer"
                    />
                </div>

                <div className="px-8 pb-8 space-y-6">
                    <div>
                        <label className="block text-[#856671] text-xs font-bold uppercase tracking-widest mb-2">
                            Amount
                        </label>
                        <div className="flex items-end gap-1">
                            <span className="text-4xl font-black text-[#ff3b8d]">
                                ₦{" "}
                            </span>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="text-4xl font-black text-[#171214] placeholder-gray-200 outline-none w-full border-none bg-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className=" text-[#856671] dark:text-gray-400 text-xs font-bold uppercase mb-2">
                            Transaction Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Weekly Groceries"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 bg-gray-50 border border-[#e4dcdf] rounded-lg px-4 font-medium text-[#171214] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[#856671] text-xs font-bold uppercase  mb-2">
                            Transaction Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full h-12 bg-gray-50 border border-[#e4dcdf] rounded-lg px-4 font-medium text-[#171214]  outline-none"
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[#856671] text-xs font-bold uppercase tracking-widest mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-12 bg-gray-50 border border-[#e4dcdf]  rounded-lg px-4 font-medium text-[#171214]  outline-none"
                            >
                                <option value="lifestyle">Lifestyle</option>
                                <option value="dining">Dining</option>
                                <option value="income">Income</option>
                                <option value="savings">Savings</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[#856671] text-xs font-bold uppercase tracking-widest mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-12 bg-gray-50  border border-[#e4dcdf]  rounded-lg px-4 font-medium text-[#171214] outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <span className="size-8 rounded-full bg-pink-500/20 flex items-center justify-center border-2 border-white ">
                                <Icon
                                    icon="mdi:shopping-outline"
                                    className="text-pink-500 text-sm"
                                />
                            </span>

                            <span className="size-8 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-white ">
                                <Icon
                                    icon="mdi:food-outline"
                                    className="text-green-500 text-sm"
                                />
                            </span>

                            <span className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-white ">
                                <Icon
                                    icon="mdi:piggy-bank-outline"
                                    className="text-purple-500 text-sm"
                                />
                            </span>
                        </div>

                        <p className="text-xs font-medium text-[#856671]">
                            Quick categories based on history
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 h-14 text-[#856671] dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-[2] h-12 bg-[#ff3b8d] text-white rounded-xl font-bold shadow-lg shadow-primary/30 disabled:bg-gray-400"
                        >
                            {loading ? "Saving..." : "Save Transaction"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferModal;
