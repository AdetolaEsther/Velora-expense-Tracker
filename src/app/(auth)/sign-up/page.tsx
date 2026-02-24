"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { AuthWrapper } from "@/src/component/AuthWrapper";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return alert("Fill all fields");

        setLoading(true); 
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = {
                id: uuidv4(),
                email,
                passwordHash: hashedPassword,
                createdAt: new Date().toISOString(),
            };

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (data.success) {
                alert("Account created!");
                setEmail("");
                setPassword("");
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Error signing up");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <AuthWrapper>
            <div className="mb-6">
                <h2 className="text-4xl font-black text-[#171214] mb-2">
                    Create your account
                </h2>
                <p className="text-[#856671] dark:text-gray-400 text-base">
                    Start your journey to financial freedom today.
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-3 h-14 rounded-xl text-lg font-bold transition-all shadow-lg ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#9B59B6] hover:bg-[#8E44AD] text-white"
                    }`}
                >
                    {loading ? "Creating account..." : "Get Started"}
                    {!loading && (
                        <Icon icon="ic:baseline-forward" className="w-6 h-6" />
                    )}
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
                        className={`ml-1 font-black hover:underline ${
                            loading
                                ? "text-gray-400 pointer-events-none"
                                : "text-[#d7336c]"
                        }`}
                        href="/login"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </AuthWrapper>
    );
};

export default Page;
