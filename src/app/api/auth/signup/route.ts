import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzOob5DjoVGOzd3EZaT1pYkTR2m7aCxdg3QMx9m4kF1qsMy0c80Lk5cXmhYcKdnRV3pYw/exec",
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
