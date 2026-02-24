"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { AuthWrapper } from "@/src/component/AuthWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !password) return alert("Fill all fields");

      try {
          const res = await fetch("/api/auth/login", {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();

          if (data.success) {
              router.push("/dashboard");
          } else {
              alert("Login failed: " + data.error);
          }
      } catch (err) {
          console.error(err);
          alert("Error connecting to server");
      }
  };
    return (
        <AuthWrapper>
            <div className="mb-6">
                <h2 className="text-4xl font-black text-[#171214] mb-2">
                    Welcome Back
                </h2>
                <p className="text-[#856671] dark:text-gray-400 text-base">
                    Enter your details to continue your journey with Velora.
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
                <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    placeholder="e.g. name@email.com"
                    sx={{ mb: 3 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative w-full mt-4">
                    <span className="absolute right-0 -top-5 font-bold text-sm text-[#d7336c] cursor-pointer">
                        Forgot your password?
                    </span>

                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                </div>

                <button
                    className="w-full bg-[#9B59B6] hover:bg-[#8E44AD] transition-all text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4"
                    type="submit"
                >
                    Login{" "}
                    <Icon icon="ic:baseline-forward" className="w-6 h-6" />
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="text-[#856671] dark:text-gray-400 font-medium text-sm">
                    Don't have an account?
                    <Link
                        href="/sign-up"
                        className="text-[#d7336c] font-black ml-1 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthWrapper>
    );
};

export default Page;
