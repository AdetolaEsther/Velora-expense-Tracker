"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import TransferModal from "../modals/TransferModal";

interface LayoutProps {
    children: React.ReactNode;
}

export default function NavLayout({ children }: LayoutProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [isTransferModalOpen, setTransferModalOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const showTransfer = pathname === "/transactions";

    const navItems = [
        {
            id: "dashboard",
            icon: "ic:round-dashboard",
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            id: "budgets",
            icon: "solar:wallet-bold",
            label: "Budgets",
            href: "/budgets",
        },
        {
            id: "transactions",
            icon: "akar-icons:reciept",
            label: "Transactions",
            href: "/transactions",
        },
        { id: "goals", icon: "stash:target", label: "Goals", href: "/goals" },
        {
            id: "settings",
            icon: "solar:settings-bold",
            label: "Settings",
            href: "/settings",
        },
    ];

    const handleLogout = () => {
        // Optional: clear auth tokens / local storage here
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen bg-[#faf9f6]">
            {/* Sidebar */}
            <div className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-[#faf9f6] border-r border-black/5 p-6 flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white flex items-center justify-center rounded-xl shadow">
                        <Icon
                            icon="gridicons:stats-down-alt"
                            className="w-6 h-6 text-[#d7336c]"
                        />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">
                        Velora
                    </h2>
                </div>

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.id} href={item.href}>
                            <div
                                className={`flex items-center mt-2 gap-3 px-4 py-3 rounded-xl transition-all ${
                                    isActive
                                        ? "bg-[#ff3b8d]/10 text-[#ff3b8d]"
                                        : "text-[#856671] hover:bg-black/5"
                                }`}
                            >
                                <Icon icon={item.icon} className="w-6 h-6" />
                                <span
                                    className={`text-[0.95rem] ${isActive ? "font-bold" : "font-semibold"}`}
                                >
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="ml-auto w-1 h-5 bg-[#ff3b8d] rounded-sm" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-[280px] flex flex-col">
                <div className="fixed top-0 right-0 h-[70px] w-full md:w-[calc(100%-280px)] bg-[#faf9f6] border-b border-black/5 flex items-center justify-end px-6 z-50">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-xl bg-black/5 text-gray-600">
                            <Icon
                                icon="solar:bell-bing-bold-duotone"
                                className="w-5 h-5"
                            />
                        </div>

                        {/* Avatar */}
                        <div
                            className="w-10 h-10 rounded-full border-2 border-[#d7336c] bg-cover cursor-pointer"
                            style={{
                                backgroundImage:
                                    'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix")',
                            }}
                            onClick={() => setLogoutModalOpen(true)}
                        />
                    </div>

                    {showTransfer && (
                        <button
                            onClick={() => setTransferModalOpen(true)}
                            className="px-2.5 py-1.5 bg-[#014d4e] text-white border-2 border-white/5 rounded-lg text-sm font-black shadow-md flex items-center ml-3"
                        >
                            <Icon
                                icon="ic:baseline-sync-alt"
                                className="text-2xl"
                            />
                            Add Transaction
                        </button>
                    )}
                </div>

                <div className="pt-[70px] p-6">{children}</div>
            </div>

            <TransferModal
                isOpen={isTransferModalOpen}
                onClose={() => setTransferModalOpen(false)}
            />

            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl p-6 w-80 shadow-lg flex flex-col gap-4">
                        <h3 className="text-lg font-bold">Log Out</h3>
                        <p>Are you sure you want to log out?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-200 font-semibold"
                                onClick={() => setLogoutModalOpen(false)}
                            >
                                No
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-[#d7336c] text-white font-bold"
                                onClick={handleLogout}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
