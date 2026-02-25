import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
      console.log("API ROUTE HIT");
    try {
        const { email, password } = await req.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxU0ahjPMK5wvmzeaWe-u1P_xok2EnynNpuE416D7QRV_roijT-iJ3zIJX3H1bT-JD5tg/exec",
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

        return NextResponse.json({
            success: true,
            userId: data.userId,
            email: data.email,
        });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
