import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyIi5NY3y8pdDYvOM8qmGhM9mhzDudDTY5IyjBw89LxOGEZyES3_lM_siHcW9eTgaqL4w/exec",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "login",
                    email,
                    password,
                }),
            },
        );

const text = await response.text();
console.log("RAW RESPONSE:", text);

const data = JSON.parse(text);
        if (!data.success) {
            return NextResponse.json({ success: false, error: data.error });
        }

        const passwordMatch = await bcrypt.compare(password, data.passwordHash);

        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                error: "Incorrect password",
            });
        }

        return NextResponse.json({ success: true, userId: data.userId });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
