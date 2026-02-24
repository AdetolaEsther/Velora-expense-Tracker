// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxpnORx0dbVYL1duWHnAhVlJ1QD6cHFfhSVG_PPfyAyD1kPmUySr7YzqJUHssa8sylDFA/exec",
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            },
        );

        const data = await response.json();

        return NextResponse.json(data);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message });
    }
}
