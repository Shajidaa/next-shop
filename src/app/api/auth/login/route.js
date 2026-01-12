import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const tenantValue = process.env.NEXT_PUBLIC_TENANT_HEADER;

    const response = await fetch(`${baseUrl}/v2/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": tenantValue,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Connection error" }, { status: 500 });
  }
}
