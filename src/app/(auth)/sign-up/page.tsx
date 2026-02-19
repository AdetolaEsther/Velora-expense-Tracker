"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
    TextField,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { AuthWrapper } from "@/src/component/AuthWrapper";

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthWrapper>
            <div className="mb-6">
                <h2 className="text-4xl font-black text-[#171214]  mb-2 ">
                    Create your account
                </h2>
                <p className="text-[#856671] dark:text-gray-400 text-base">
                    Start your journey to financial freedom today.
                </p>
            </div>

            <form className="space-y-4 " onSubmit={(e) => e.preventDefault()}>
                <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    placeholder="Enter your full name"
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    placeholder="e.g. name@email.com"
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                >
                                    <Icon
                                        icon={
                                            showPassword
                                                ? "ic:outline-visibility"
                                                : "ic:outline-visibility-off"
                                        }
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                

                <button
                    className="w-full bg-[#9B59B6] hover:bg-[#8E44AD] transition-all text-white h-14 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 mt-4"
                    type="submit"
                >
                    Get Started
                    <Icon icon="ic:baseline-forward" className="w-6 h-6" />
                </button>
            </form>

            <div className="flex items-center gap-4 my-6">
                <div className="h-px bg-[#e4dcdf] dark:bg-gray-700 flex-1"></div>
                <span className="text-[10px] font-black text-[#856671] uppercase tracking-[0.1em]">
                    or continue with
                </span>
                <div className="h-px bg-[#e4dcdf] dark:bg-gray-700 flex-1"></div>
            </div>

            

            <div className="text-center">
                <p className="text-[#856671] dark:text-gray-400 font-medium text-sm">
                    Already have an account?
                    <a
                        className="text-[#d7336c] font-black ml-1 hover:underline"
                        href="#"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </AuthWrapper>
    );
};

export default Page;
