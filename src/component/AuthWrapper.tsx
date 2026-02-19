"use client";
import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";

interface AuthWrapperProps {
    children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#171214] dark:text-white h-screen overflow-hidden">
            <div className="flex h-full">
                <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 text-white relative overflow-hidden bg-[#d7336c]">
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-white text-primary flex items-center justify-center rounded-xl shadow-lg">
                            <Icon
                                icon="gridicons:stats-down-alt"
                                className="w-6 h-6"
                                style={{ color: "#d7336c" }}
                            />
                        </div>
                        <h2 className="text-2xl font-black tracking-[-0.015em]">
                            Velora
                        </h2>
                    </div>

                    <div className="relative z-10 flex flex-col items-start">
                        <div className="relative w-full mb-2">
                            <div
                                className="w-full aspect-16/12 max-h-[650px] bg-center bg-no-repeat bg-cover rounded-2xl shadow-2xl border-2 border-white/20"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnAUYrtqIg8rOfVomILYVRIfkU5THjYyz6kWSW7XTHSW7tWmdeyD7UMwT-TDmI1fchjUiOjp08ykMDU0XpZ73DX8W_6DVbfKu-XImKWP2pA8MEawl0e3YwCTU5BAS63OGIClzno_Hmzf3vk28kfep-Hy12Ky1EEzHw-fL-2L4sO3Jw_xnwwQnEjgcvw9xqKlcYaoAYG-9ebz_NjVgQXlT4i0K5yNyBCkrWrawQdUVK1qw8RoAENVkHQOiARJyqhEF9gn7JEg_5RHQ")',
                                }}
                            />
                            <div className="absolute -bottom-6 -right-6 bg-glass p-4 rounded-2xl shadow-xl border border-white/30 hidden xl:block backdrop-blur-md bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-green-400 flex items-center justify-center text-white">
                                        <Icon
                                            icon="ic:baseline-trending-up"
                                            className="w-5 h-5 ml-1"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-wider">
                                            Net Worth Growth
                                        </p>
                                        <p className="text-lg font-black">
                                            +24.5%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-5xl font-black leading-tight tracking-[-0.04em] mb-4">
                            Own Your <br />
                            <span className="text-[#9B59B6]">Future.</span>
                        </h1>
                        <p className="text-lg font-medium opacity-90 max-w-md leading-relaxed">
                            Empowering women to build wealth, master their
                            money, and lead with financial confidence.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-semibold tracking-wide uppercase opacity-80">
                                Join the 100k+ movement
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background-light dark:bg-background-dark overflow-y-auto">
                    <div className="w-full max-w-110 py-8">
                        <div className="lg:hidden flex items-center gap-2 mb-6">
                            <div className="size-8 bg-primary text-white flex items-center justify-center rounded-lg shadow-md">
                                <Icon
                                    icon="gridicons:stats-down-alt"
                                    className="w-5 h-5"
                                />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-primary">
                                Velora
                            </h2>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
