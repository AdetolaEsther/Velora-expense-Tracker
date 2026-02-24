import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyIi5NY3y8pdDYvOM8qmGhM9mhzDudDTY5IyjBw89LxOGEZyES3_lM_siHcW9eTgaqL4w/exec",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "getTransactions" }),
            },
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
